<!--
@component
This component take any javascript object and tries to render it as a human readable representation.
-->
<script lang="ts">

    /* eslint-disable @typescript-eslint/no-explicit-any */

    import ObjectTable from "./ObjectTable.svelte";

    interface Props {
        /**
         * Javascript value to be rendered.
         *
         * Note : the use of `any` type is intentional in this component
         * since it accepts any javascript object as data **/
        data: any;
        /**
         * Summarizes any rendered value that can take a considerable amount of screen space.
         * It summarizes :
         * - Tables
         * - Lists
         */
        summarize?: boolean;
        /**
         * Summarizes inner values.
         *
         * Ex.
         *
         * ```html
         * <ObjectTable
         *     data={foo:"bar",baz:["a","b","c"]},
         *     summarizeInner
         *     />
         * ```
         * Will render something like :
         * ```html
         * <table>
         * <thead>
         *     <tr>
         *         <th>foo</th>
         *         <th>baz</th>
         *     </tr>
         * </thead>
         * <tbody>
         *     <tr>
         *         <td><span>bar</span></td>
         *         <td>
         *             <details><summary>a, b, c</summary>
         *             <ul>
         *                 <li><span>a</span></li>
         *                 <li><span >b</span></li>
         *                 <li><span >c</span></li>
         *             </ul>
         *             </details>
         *             </td>
         *     </tr>
         * </tbody>
         * </table>
         * ```
         */
        summarizeInner?: boolean;
    }

    const {data, summarize = false, summarizeInner = false}: Props = $props();

    const _isHttpUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        }
            // We don't care of the error, error means this is not an URL
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        catch (_) {
            return false;
        }
    };
    const _isPicture = (url: string) => url.endsWith(".jpg");
    let typeOfData = $derived(Object.prototype.toString.call(data));
    let isObject = $derived(typeOfData === "[object Object]");
    let isNullish = $derived(
        typeOfData === "[object Undefined]" || typeOfData === "[object Null]"
    );
    let isEmptyObject = $derived(
        typeOfData === "[object Object]" && JSON.stringify(data) === "{}"
    );


    let isArray = $derived(typeOfData === "[object Array]");

    let isString = $derived(typeOfData === "[object String]");
    let isNumber = $derived(typeOfData === "[object Number]");
    let isHttpUrl = $derived(isString && _isHttpUrl(data));
    let isPicture = $derived(isString && _isPicture(data));

    // eslint-disable @typescript-eslint/no-explicit-any
    function sameMembers(arr1: Array<any>, arr2: Array<any>) {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        return (
            arr1.every((item) => set2.has(item)) &&
            arr2.every((item) => set1.has(item))
        );
    }

    const _isArrayOfSameObjects = (anArray: Array<any>): boolean => {
        const dataType = Object.prototype.toString.call(anArray);
        if (dataType !== "[object Array]") {
            return false;
        }
        if (anArray.length === 0) {
            return false;
        }
        const every_array_value_is_an_object = anArray.every(
            (value) => Object.prototype.toString.call(value) === "[object Object]"
        );
        if (!every_array_value_is_an_object) {
            return false;
        }
        const first_array_value_keys = Object.keys(anArray[0]);
        const every_array_value_has_the_same_keys = anArray.every((value) =>
            sameMembers(first_array_value_keys, Object.keys(value))
        );
        return every_array_value_has_the_same_keys;
    };

    let isArrayOfSameObjects = $derived(_isArrayOfSameObjects(data));

    const deriveHeaders = (someData: any) => {
        if (someData === undefined) {
            return [];
        }
        if (isObject) {
            return Object.keys(someData);
        }
        if (isArrayOfSameObjects) {
            return Object.keys(someData[0]);
        }
        return [];
    };

    const summarizeList = (items: string[]) => {
        const joinedItems = items.join(", ");
        const maxLength = 100;
        if (joinedItems.length <= maxLength) {
            return joinedItems;
        }
        return joinedItems.slice(0, maxLength) + "…";
    };

    const deriveRows = (someData: any) => {
        if (someData === undefined) {
            return [];
        }
        if (isObject) {
            return [someData];
        }
        if (isArrayOfSameObjects) {
            console.log("deriveRows.isArrayOfSameObjects");
            return someData;
        }
        return [];
    };

    let headers = $derived(deriveHeaders(data));
    let rows = $derived(deriveRows(data));
</script>

{#if isPicture}{@render picture(data)}
{:else if isHttpUrl}{@render link(data)}
{:else if isString || isNumber}{@render string(data)}
{:else if isNullish || isEmptyObject}{@render empty()}
{:else if isArray && !isArrayOfSameObjects}
    {#if summarize}
        <details>
            <summary>{summarizeList(data)}</summary>
            {@render list(data, summarizeInner)}
        </details>
    {:else}
        {@render list(data, summarizeInner)}
    {/if}
{:else if isObject || isArrayOfSameObjects}
    {#if summarize}
        <details>
            <summary>{summarizeList(headers)}</summary>
            {@render table(headers, rows, summarizeInner)}
        </details>
    {:else}
        {@render table(headers, rows, summarizeInner)}
    {/if}
{/if}

{#snippet
    list(items, summarizeInner)}
    <ul>
        {#each items as item (item)}
            <li>
                <ObjectTable data={item} summarize={summarizeInner}/>
            </li>
        {/each}
    </ul>
{/snippet}

<!-- tag::global-style-in-svelte-component[] -->
{#snippet table(headers, rows, summarizeInner)}
    <table class="object-table-table">
        <thead>
        <tr>
            {#each headers as header (header)}
                <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each rows as row (row)}
            <tr>
                {#each headers as header (header)}
                    <td>
                        <ObjectTable data={row[header]} summarize={summarizeInner}/>
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
{/snippet}
<!-- end::global-style-in-svelte-component[] -->

{#snippet picture(url)}
    <img alt="" src={url}/>
{/snippet}

{#snippet link(url)}
    <a href={url}>{url}</a>
{/snippet}

{#snippet string(text)}
    <span>{text}</span>
{/snippet}

{#snippet empty()}<span></span>{/snippet}

<style>

</style>

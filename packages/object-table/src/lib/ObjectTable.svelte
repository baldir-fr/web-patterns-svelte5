<script lang="ts">
    import ObjectTable from "./ObjectTable.svelte"

    const {data, summarize, summarizeInner} = $props()

    let typeOfData = $derived(Object.prototype.toString.call(data))
    let isArray = $derived(typeOfData === "[object Array]")

    let isString = $derived(typeOfData === "[object String]")
    let isNumber = $derived(typeOfData === "[object Number]")
    let isHttpUrl = $derived(isString && _isHttpUrl(data))
    let isPicture = $derived(isString && _isPicture(data))

    const _isHttpUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch (_) {
            return false;
        }
    }
    const _isPicture = (url: string) => url.endsWith(".jpg")
    let isObject = $derived(typeOfData === "[object Object]")
    let isNullish = $derived(typeOfData === "[object Undefined]" || typeOfData === "[object Null]")
    let isEmptyObject = $derived(typeOfData === "[object Object]" && JSON.stringify(data) === "{}")


    function sameMembers(arr1, arr2) {
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        return arr1.every(item => set2.has(item)) &&
            arr2.every(item => set1.has(item))
    }

    const _isArrayOfSameObjects = (anArray: Array<unknown>): boolean => {

        const dataType = Object.prototype.toString.call(anArray);
        if (dataType !== "[object Array]") {
            return false
        }
        if (anArray.length === 0) {
            return false
        }
        const every_array_value_is_an_object = anArray.every(value => Object.prototype.toString.call(value) === "[object Object]");
        if (!every_array_value_is_an_object) {
            return false;
        }
        const first_array_value_keys = Object.keys(anArray[0])
        const every_array_value_has_the_same_keys = anArray.every(value => sameMembers(first_array_value_keys, Object.keys(value)))
        return every_array_value_has_the_same_keys;

    }

    let isArrayOfSameObjects = $derived(_isArrayOfSameObjects(data))

    const deriveHeaders = (someData) => {
        if (someData === undefined) {
            return []
        }
        if (isObject) {
            return Object.keys(someData)
        }
        if (isArrayOfSameObjects) {
            return Object.keys(someData[0])
        }
        return []
    }

    const summarizeList = (items: string[]) => {
        const joinedItems = items.join(", ");
        const maxLength = 100;
        if (joinedItems.length <= maxLength) {
            return joinedItems
        }
        return joinedItems.slice(0, maxLength) + "…";
    }

    const deriveRows = (someData) => {
        if (someData === undefined) {
            return []
        }
        if (isObject) {
            return [someData]
        }
        if (isArrayOfSameObjects) {
            console.log("deriveRows.isArrayOfSameObjects")
            return someData
        }
        return []
    }

    let headers = $derived(deriveHeaders(data))
    let rows = $derived(deriveRows(data))

    // $inspect("data : " + JSON.stringify(data))
    // $inspect("isString : " + isString + ", isObject : " + isObject + ", isArray : " + isArray + ", isArrayOfSameObjects : " + isArrayOfSameObjects + ", isEmptyObject: " + isEmptyObject + ", isNullish : " + isNullish)
    // $inspect("rows : " + JSON.stringify(rows))
    // $inspect("headers : " + JSON.stringify(headers))
    // $inspect("isArrayOfSameObjects : " + isArrayOfSameObjects)

    // const headers: Array<string> = ["a", "b", "c"]
    // const rows: Array<Record<string, unknown>> = [
    //     {
    //         "a": "foo",
    //         "b": "bar"
    //     },
    //     {
    //         "b": "bar bar",
    //         "a": "foo foo",
    //     },
    // ]


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
            {@render table(data, summarizeInner)}
        </details>
    {:else}
        {@render table(data, summarizeInner)}
    {/if}
{/if}

{#snippet list(data, summarizeInner)}
    <ul>
        {#each data as stringValue}
            <li>
                <ObjectTable data={stringValue} summarize={summarizeInner}/>
            </li>
        {/each}
    </ul>
{/snippet}

{#snippet table(data, summarizeInner)}
    <table class="object-table-table">
        <thead>
        <tr>
            {#each headers as header}
                <th>{header}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each rows as row}
            <tr>
                {#each headers as header}
                    <td>
                        <ObjectTable data={row[header]} summarize={summarizeInner}/>
                    </td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
{/snippet}

{#snippet picture(data)}
    <img src={data}/>
{/snippet}

{#snippet link(data)}
    <a href={data}>{data}</a>
{/snippet}

{#snippet string(data)}
    <span>{data}</span>
{/snippet}

{#snippet empty()}<span></span>{/snippet}


<style>
    /* Global style to embrace the cascade. */
    :global {
        .object-table-table table, .object-table-table td, .object-table-table th {
            border: lightslategrey solid;
        }

        table.object-table-table {
            border-collapse: collapse;
        }

        .object-table-table td {
            min-width: 12rem;
            padding: 1rem;
            overflow-wrap: break-word;
            overflow-x: auto;
        }

        .object-table-table th {

            padding: 1rem;
        }
    }
</style>

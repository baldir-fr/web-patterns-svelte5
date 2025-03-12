<!-- tag::svelte-import-css[] -->
<script lang="ts">
    // Use bundled style :
    // import  "svelte-object-table/object-table.css";
    // Or your own :
    import "../object-table.css"
    import {ObjectTable} from "$lib/index.js";
</script>
<!-- end::svelte-import-css[] -->

<h1>ObjectTable</h1>
<ObjectTable data={{"Border color":"is overriden with CSS cascade"}}></ObjectTable>

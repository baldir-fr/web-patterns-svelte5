<script module lang="ts">
    import {defineMeta, setTemplate} from '@storybook/addon-svelte-csf';
    import ObjectTable from "$lib/ObjectTable.svelte";

    const {Story} = defineMeta({
        title: 'Baldir-UI/ObjectTable',
        component: ObjectTable,
        args: {
            data: undefined,
            summarize: false,
            summarizeInner: false,
        }
    });

    const complexObject = [
        {
            "_id": "67d05e3a83c9ef1b360e84e9",
            "index": 0,
            "guid": "a650789b-f77f-460b-a8a2-2c90e89b5730",
            "isActive": false,
            "balance": "$1,887.96",
            "picture": "http://placehold.it/32x32",
            "age": 22,
            "eyeColor": "blue",
            "name": "Tamera Oneil",
            "gender": "female",
            "company": "ECOSYS",
            "email": "tameraoneil@ecosys.com",
            "phone": "+1 (896) 533-2462",
            "address": "506 Sands Street, Rew, Alaska, 5335",
            "about": "Eu Lorem magna tempor culpa ea aliqua aute. Sit anim ipsum occaecat laboris aliquip. Occaecat excepteur excepteur est dolore cillum sunt aliqua enim nisi ex nisi. Dolor eiusmod magna est reprehenderit duis dolore adipisicing velit magna est consectetur.\r\n",
            "registered": "2019-01-20T08:44:18 -01:00",
            "latitude": 33.894322,
            "longitude": -106.354139,
            "tags": [
                "incididunt",
                "occaecat",
                "cupidatat",
                "id",
                "veniam",
                "cupidatat",
                "culpa"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Maxine Reyes"
                },
                {
                    "id": 1,
                    "name": "Christie Fuentes"
                },
                {
                    "id": 2,
                    "name": "Delaney Mcgee"
                }
            ],
            "greeting": "Hello, Tamera Oneil! You have 2 unread messages.",
            "favoriteFruit": "apple"
        },
        {
            "_id": "67d05e3af6d0992db8e8f77f",
            "index": 1,
            "guid": "b7108a01-b6f6-4c0d-866a-6f61c928d7bf",
            "isActive": true,
            "balance": "$3,163.77",
            "picture": "http://placehold.it/32x32",
            "age": 37,
            "eyeColor": "blue",
            "name": "Sanchez Freeman",
            "gender": "male",
            "company": "NETBOOK",
            "email": "sanchezfreeman@netbook.com",
            "phone": "+1 (975) 545-2835",
            "address": "822 Granite Street, Marbury, Connecticut, 7818",
            "about": "Labore quis nostrud officia aliqua nulla adipisicing mollit ut est reprehenderit aliqua excepteur officia in. Exercitation culpa eiusmod reprehenderit quis nisi. Nulla laborum aliqua incididunt ex qui laborum qui et aute occaecat deserunt esse culpa. Dolor ea Lorem eiusmod sunt cillum do. Velit laboris exercitation esse tempor exercitation pariatur qui ut magna est excepteur qui id est.\r\n",
            "registered": "2024-10-15T08:51:10 -02:00",
            "latitude": 56.512798,
            "longitude": -55.439953,
            "tags": [
                "excepteur",
                "aliquip",
                "sit",
                "veniam",
                "dolor",
                "esse",
                "et"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Faye Camacho"
                },
                {
                    "id": 1,
                    "name": "William Wyatt"
                },
                {
                    "id": 2,
                    "name": "Etta Haney"
                }
            ],
            "greeting": "Hello, Sanchez Freeman! You have 1 unread messages.",
            "favoriteFruit": "apple"
        },
        {
            "_id": "67d05e3a9476adbae2a57b3d",
            "index": 2,
            "guid": "1df1855e-cf00-4f58-99d2-fc150c6669c2",
            "isActive": false,
            "balance": "$1,512.86",
            "picture": "http://placehold.it/32x32",
            "age": 36,
            "eyeColor": "blue",
            "name": "Rush Pena",
            "gender": "male",
            "company": "CUBICIDE",
            "email": "rushpena@cubicide.com",
            "phone": "+1 (990) 514-3441",
            "address": "245 Dictum Court, Terlingua, District Of Columbia, 9347",
            "about": "Eu pariatur dolore eu sint consectetur ex elit do. Nisi in qui cillum irure aliquip sint cillum dolore. Elit enim culpa ex non velit sint ut ullamco irure do dolore sunt ut ut. Consequat laborum in ut consectetur et amet do cupidatat culpa labore aliqua laboris. Est reprehenderit aliquip ut ullamco ut pariatur cillum consectetur exercitation laboris pariatur reprehenderit.\r\n",
            "registered": "2022-10-10T01:30:00 -02:00",
            "latitude": -31.624699,
            "longitude": 157.152706,
            "tags": [
                "cupidatat",
                "dolor",
                "aute",
                "sunt",
                "aute",
                "adipisicing",
                "esse"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Nell Castro"
                },
                {
                    "id": 1,
                    "name": "Downs Maxwell"
                },
                {
                    "id": 2,
                    "name": "Bryant Koch"
                }
            ],
            "greeting": "Hello, Rush Pena! You have 2 unread messages.",
            "favoriteFruit": "apple"
        },
        {
            "_id": "67d05e3a15fbbafae532ebc1",
            "index": 3,
            "guid": "7a2f9d54-d6f6-468f-a688-a9de90fe983c",
            "isActive": false,
            "balance": "$1,002.35",
            "picture": "http://placehold.it/32x32",
            "age": 33,
            "eyeColor": "brown",
            "name": "Huffman Cabrera",
            "gender": "male",
            "company": "SLAX",
            "email": "huffmancabrera@slax.com",
            "phone": "+1 (869) 498-2997",
            "address": "965 Seaview Avenue, Aurora, New Mexico, 4172",
            "about": "Velit mollit nulla nostrud anim esse aliquip. Laboris est id est occaecat occaecat magna cupidatat. Tempor non ad occaecat consequat deserunt ad id veniam est labore incididunt consectetur. Nulla exercitation velit dolor sunt. Est sunt excepteur amet aute occaecat tempor culpa fugiat incididunt. Amet velit culpa fugiat nostrud cupidatat duis voluptate excepteur non fugiat commodo fugiat.\r\n",
            "registered": "2017-05-26T11:54:41 -02:00",
            "latitude": -38.018801,
            "longitude": -12.339387,
            "tags": [
                "id",
                "elit",
                "sit",
                "consequat",
                "labore",
                "nostrud",
                "officia"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Marci Rutledge"
                },
                {
                    "id": 1,
                    "name": "Levine Mann"
                },
                {
                    "id": 2,
                    "name": "Shelby Brennan"
                }
            ],
            "greeting": "Hello, Huffman Cabrera! You have 4 unread messages.",
            "favoriteFruit": "banana"
        },
        {
            "_id": "67d05e3adf84bce78bfa39cb",
            "index": 4,
            "guid": "63f6b0d7-67c0-45d2-be40-5ed66565d043",
            "isActive": false,
            "balance": "$1,376.13",
            "picture": "http://placehold.it/32x32",
            "age": 32,
            "eyeColor": "brown",
            "name": "Bobbi Cooper",
            "gender": "female",
            "company": "NETROPIC",
            "email": "bobbicooper@netropic.com",
            "phone": "+1 (913) 526-3781",
            "address": "664 Bryant Street, Rosewood, Maryland, 4558",
            "about": "Adipisicing nisi consectetur ullamco nostrud. Magna ut proident enim dolore do commodo sunt reprehenderit quis velit consequat do. Eu aliqua ad nulla nulla. Ipsum sunt amet ex excepteur non veniam cillum do reprehenderit enim laboris laboris. Enim voluptate commodo ea fugiat quis mollit. Laboris dolore reprehenderit velit velit fugiat magna amet id officia culpa do.\r\n",
            "registered": "2021-04-01T09:57:43 -02:00",
            "latitude": 58.108992,
            "longitude": -63.10203,
            "tags": [
                "sint",
                "cupidatat",
                "do",
                "aliqua",
                "sunt",
                "dolore",
                "fugiat"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Suzanne Higgins"
                },
                {
                    "id": 1,
                    "name": "Jana Roberts"
                },
                {
                    "id": 2,
                    "name": "Sylvia Pitts"
                }
            ],
            "greeting": "Hello, Bobbi Cooper! You have 3 unread messages.",
            "favoriteFruit": "strawberry"
        },
        {
            "_id": "67d05e3a85194670b6295889",
            "index": 5,
            "guid": "5fa99d94-7165-487e-86fc-451f5ef094bc",
            "isActive": true,
            "balance": "$1,194.46",
            "picture": "http://placehold.it/32x32",
            "age": 25,
            "eyeColor": "green",
            "name": "Phoebe Mccullough",
            "gender": "female",
            "company": "DIGIAL",
            "email": "phoebemccullough@digial.com",
            "phone": "+1 (889) 562-3519",
            "address": "700 Caton Place, Imperial, Palau, 5918",
            "about": "Deserunt magna magna commodo commodo. Excepteur id fugiat esse non. Nisi officia qui commodo et incididunt officia.\r\n",
            "registered": "2019-12-26T08:16:25 -01:00",
            "latitude": -47.511054,
            "longitude": 96.516928,
            "tags": [
                "laboris",
                "aliqua",
                "aute",
                "ad",
                "quis",
                "cupidatat",
                "aute"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Hickman Mason"
                },
                {
                    "id": 1,
                    "name": "Pratt Molina"
                },
                {
                    "id": 2,
                    "name": "Mamie Evans"
                }
            ],
            "greeting": "Hello, Phoebe Mccullough! You have 3 unread messages.",
            "favoriteFruit": "banana"
        },
        {
            "_id": "67d05e3abb697dd3c4289bfc",
            "index": 6,
            "guid": "c54bc834-b0a8-4442-ac78-2a911e21dcd7",
            "isActive": true,
            "balance": "$2,780.56",
            "picture": "http://placehold.it/32x32",
            "age": 29,
            "eyeColor": "blue",
            "name": "Sykes Kerr",
            "gender": "male",
            "company": "BIZMATIC",
            "email": "sykeskerr@bizmatic.com",
            "phone": "+1 (873) 530-3759",
            "address": "715 Albemarle Road, Morgandale, South Carolina, 3433",
            "about": "Laboris id non duis non fugiat non labore est velit. Id sit mollit esse elit. Elit reprehenderit consequat magna adipisicing mollit voluptate voluptate veniam. Irure dolore eiusmod tempor ipsum sint culpa eu ut laborum nulla. Incididunt cillum dolor culpa amet labore dolore do esse. Quis reprehenderit deserunt esse amet sunt aliqua ex ad aliqua excepteur aute in.\r\n",
            "registered": "2024-06-26T12:20:07 -02:00",
            "latitude": -22.17335,
            "longitude": 66.823874,
            "tags": [
                "quis",
                "labore",
                "et",
                "quis",
                "id",
                "fugiat",
                "id"
            ],
            "friends": [
                {
                    "id": 0,
                    "name": "Love Moreno"
                },
                {
                    "id": 1,
                    "name": "Mendez Hanson"
                },
                {
                    "id": 2,
                    "name": "Cherry Wade"
                }
            ],
            "greeting": "Hello, Sykes Kerr! You have 3 unread messages.",
            "favoriteFruit": "strawberry"
        }
    ]

</script>

<script lang="ts">
    setTemplate(template);
</script>

{#snippet template({...args})}
    <ObjectTable {...args}/>
{/snippet}

<Story name="Empty"/>
<Story name="List of strings" args={{ data: ["a","b","c"] }}/>
<Story name="Flat object as table" args={{ data: {foo:"bar",baz:"moo"}}}/>
<Story name="Nested object as nested table" args={{
    data: {
        foo: "bar",
        baz: { moo:"mar" }
    }
}}/>

<Story name="Array of objects with same keys as table" args={{
    data: [
        { foo: "bar", baz: "moo"},
        { baz: "moo 2", foo: "bar 2"}
        ]
}}/>

<Story name="Array of objects with different keys as list of tables" args={{
    data: [
        { foo: "bar"},
        { baz: "moo 2", foo: "bar 2"}
        ]
}}/>

<Story name="Complex object" args={{
    data: complexObject
}}/>

<Story name="Summarize inner values" args={{
    data: {foo:"bar",baz:["a","b","c"]},
    summarizeInner:true
}}/>

<Story name="Pictures" args={{
    data: ["https://http.cat/401.jpg","https://http.cat/404.jpg"],
}}/>
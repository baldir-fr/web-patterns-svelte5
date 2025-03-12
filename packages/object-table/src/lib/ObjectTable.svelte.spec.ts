import {describe, expect, it} from "vitest";
import {render} from "@testing-library/svelte";
import ObjectTable from "$lib/ObjectTable.svelte";
import '@testing-library/jest-dom/vitest';

describe('ObjectTable', () => {

    describe('with empty data', () => {
        it.each([
            {data: undefined},
            {data: null},
        ])('renders no element with $data', ({data}) => {
            const {container} = render(ObjectTable, {
                props: {
                    data
                }
            })
            expect(container.textContent).toBe("")
        })
    })
    describe('with string literal', () => {
        it('renders as text', () => {
            const {getAllByText} = render(ObjectTable, {
                props: {
                    data: "some text"
                }
            })

            getAllByText("some text")
        })
        it('escapes text', () => {
            const {getByText} = render(ObjectTable, {
                props: {
                    data: `<img src="foo.png" />`
                }
            })

            const result = getByText(`<img src="foo.png" />`)

            expect(result).toMatchInlineSnapshot(`
              <span>
                &lt;img src="foo.png" /&gt;
              </span>
            `)
        })
    })
    describe('with HTTP Url', () => {
        it('renders as anchor', () => {
            const {getByText} = render(ObjectTable, {
                props: {
                    data: "https://foo.bar"
                }
            })


            expect(getByText("https://foo.bar")).toMatchInlineSnapshot(`
              <a
                href="https://foo.bar"
              >
                https://foo.bar
              </a>
            `)
        })
    })
    describe('with Picture URL', () => {
        it('renders as image', () => {
            const {getByRole} = render(ObjectTable, {
                props: {
                    data: "https://foo.bar.jpg"
                }
            })

            expect(getByRole("presentation")).toMatchInlineSnapshot(`
              <img
                alt=""
                src="https://foo.bar.jpg"
              />
            `)
        })
    })
    describe('with string array', () => {
        it('renders as an unordered list', () => {
            const {getByRole} = render(ObjectTable, {
                props: {
                    data: ["a", "b", "c"]
                }
            })

            const list = getByRole("list")
            expect(list).toMatchInlineSnapshot(`
              <ul>
                <li>
                  <!---->
                  <span>
                    a
                  </span>
                  
                  <!---->
                </li>
                <li>
                  <!---->
                  <span>
                    b
                  </span>
                  
                  <!---->
                </li>
                <li>
                  <!---->
                  <span>
                    c
                  </span>
                  
                  <!---->
                </li>
                
              </ul>
            `)
        });

        it('renders as an empty list', () => {
            const {getByRole} = render(ObjectTable, {
                props: {
                    data: []
                }
            })

            const list = getByRole("list")
            expect(list).toMatchInlineSnapshot(`
              <ul>
                
              </ul>
            `)
        });
    });
    describe('with flat object', () => {
        // tag::global-style-rendered[]
        it('renders as table with attributes as headers', () => {
            const {getByRole} = render(ObjectTable, {props: {data: {foo: "bar"}}})
            const table = getByRole("table")
            expect(table).toMatchInlineSnapshot(`
              <table
                class="object-table-table"
              >
                <thead>
                  <tr>
                    <th>
                      foo
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <!---->
                      <span>
                        bar
                      </span>
                      
                      <!---->
                    </td>
                    
                  </tr>
                  
                </tbody>
              </table>
            `)
        });
        // end::global-style-rendered[]
    });

    describe('with nested object', () => {
        it('renders as table with nested table in cell', () => {
            const {getAllByRole} = render(ObjectTable, {
                props: {
                    data:
                        {
                            foo: {
                                bar: "baz"
                            }
                        }
                }
            })
            const tables = getAllByRole("table")
            const outerTable = tables[0]
            expect(outerTable).toMatchInlineSnapshot(`
              <table
                class="object-table-table"
              >
                <thead>
                  <tr>
                    <th>
                      foo
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <!---->
                      <!---->
                      <table
                        class="object-table-table"
                      >
                        <thead>
                          <tr>
                            <th>
                              bar
                            </th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <!---->
                              <span>
                                baz
                              </span>
                              
                              <!---->
                            </td>
                            
                          </tr>
                          
                        </tbody>
                      </table>
                      
                      
                      <!---->
                    </td>
                    
                  </tr>
                  
                </tbody>
              </table>
            `)

            const innerTable = tables[1]
            expect(innerTable).toMatchInlineSnapshot(`
              <table
                class="object-table-table"
              >
                <thead>
                  <tr>
                    <th>
                      bar
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <!---->
                      <span>
                        baz
                      </span>
                      
                      <!---->
                    </td>
                    
                  </tr>
                  
                </tbody>
              </table>
            `)
        });
    });
    describe('with array of objects with same keys', () => {
        it('renders as table inner objects keys as headers', () => {
            const {getAllByRole} = render(ObjectTable, {
                props: {
                    data:
                        [
                            {foo: "bar", baz: "moo"},
                            {foo: "bar 2", baz: "moo 2"},
                        ]
                }
            })
            const tables = getAllByRole("table")
            const outerTable = tables[0]
            expect(outerTable).toMatchInlineSnapshot(`
              <table
                class="object-table-table"
              >
                <thead>
                  <tr>
                    <th>
                      foo
                    </th>
                    <th>
                      baz
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <!---->
                      <span>
                        bar
                      </span>
                      
                      <!---->
                    </td>
                    <td>
                      <!---->
                      <span>
                        moo
                      </span>
                      
                      <!---->
                    </td>
                    
                  </tr>
                  <tr>
                    <td>
                      <!---->
                      <span>
                        bar 2
                      </span>
                      
                      <!---->
                    </td>
                    <td>
                      <!---->
                      <span>
                        moo 2
                      </span>
                      
                      <!---->
                    </td>
                    
                  </tr>
                  
                </tbody>
              </table>
            `)

            const innerTable = tables[1]
            expect(innerTable).toMatchInlineSnapshot(`undefined`)
        });
    });

    describe('with array of objects with different keys', () => {
        it('renders as table inner objects keys as headers', () => {
            const {getAllByRole} = render(ObjectTable, {
                props: {
                    data:
                        [
                            {foo: "bar"},
                            {foo: "bar 2", baz: "moo"},
                        ]
                }
            })
            const tables = getAllByRole("list")
            const outerTable = tables[0]
            expect(outerTable).toMatchInlineSnapshot(`
              <ul>
                <li>
                  <!---->
                  <!---->
                  <table
                    class="object-table-table"
                  >
                    <thead>
                      <tr>
                        <th>
                          foo
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <!---->
                          <span>
                            bar
                          </span>
                          
                          <!---->
                        </td>
                        
                      </tr>
                      
                    </tbody>
                  </table>
                  
                  
                  <!---->
                </li>
                <li>
                  <!---->
                  <!---->
                  <table
                    class="object-table-table"
                  >
                    <thead>
                      <tr>
                        <th>
                          foo
                        </th>
                        <th>
                          baz
                        </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <!---->
                          <span>
                            bar 2
                          </span>
                          
                          <!---->
                        </td>
                        <td>
                          <!---->
                          <span>
                            moo
                          </span>
                          
                          <!---->
                        </td>
                        
                      </tr>
                      
                    </tbody>
                  </table>
                  
                  
                  <!---->
                </li>
                
              </ul>
            `)

            const innerTable = tables[1]
            expect(innerTable).toMatchInlineSnapshot(`undefined`)
        });
    });
});
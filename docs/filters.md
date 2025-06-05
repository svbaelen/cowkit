# Filters

Pandoc filters allow you to transform document content during the conversion process. Cowkit includes several built-in filters and supports custom Lua filters for advanced document processing.

## Built-in Filters

### pandoc-crossref

Handles cross-references for figures, tables, equations, and sections.

**Usage in markdown:**
```markdown
![Caption](image.png){#fig:myimage}

See [@fig:myimage] for details.

| Column 1 | Column 2 |
|----------|----------|
| Data     | Value    |

: My table caption {#tbl:mytable}

Refer to [@tbl:mytable] for the data.

$$ y = mx + b $$ {#eq:linear}

Equation [@eq:linear] shows the relationship.
```

**Configuration in `_base.md`:**
```yaml
---
crossref:
  figPrefix: "Figure"
  tblPrefix: "Table"
  eqnPrefix: "Equation"
  secPrefix: "Section"
  lstPrefix: "Listing"
---
```

### multiple-bibliographies.lua

Allows using multiple bibliography files in a single document.

**Usage:**
```yaml
---
bibliography:
  - src/bibliography/references.bib
  - src/bibliography/sources.bib
---
```

**Performance note:** Comment out this filter in `config/config.yaml` for faster development builds when not working with citations.

## Custom Lua Filters

### Filter Location

Place custom filters in `src/filters/` and reference them in `config/config.yaml`:

```yaml
filters:
  - pandoc-crossref
  - src/filters/multiple-bibliographies.lua
  - src/filters/your-custom-filter.lua
```

### Basic Filter Structure

```lua
-- Example: capitalize all headers
function Header(elem)
    if elem.level <= 2 then
        elem.content = pandoc.walk_inline(elem.content, {
            Str = function(s)
                return pandoc.Str(s.text:upper())
            end
        })
    end
    return elem
end
```

## Common Filter Examples

### 1. Custom Quote Styling

`src/filters/custom-quotes.lua`:
```lua
-- Add CSS class to blockquotes starting with "Note:"
function BlockQuote(elem)
    local first = elem.content[1]
    if first and first.t == "Para" then
        local str = pandoc.utils.stringify(first.content[1])
        if str and str:match("^Note:") then
            return pandoc.Div(elem.content, {class = "note-quote"})
        end
    end
    return elem
end
```

### 2. Auto-numbering Examples

`src/filters/example-numbering.lua`:
```lua
-- Number all divs with class "example"
local example_count = 0

function Div(elem)
    if elem.classes:includes("example") then
        example_count = example_count + 1
        local header = pandoc.Header(3, "Example " .. example_count)
        table.insert(elem.content, 1, header)
        return elem
    end
end
```

### 3. Image Path Processing

`src/filters/image-paths.lua`:
```lua
-- Prepend path to all images
function Image(elem)
    if not elem.src:match("^http") then
        elem.src = "assets/img/" .. elem.src
    end
    return elem
end
```

### 4. Table Enhancement

`src/filters/table-classes.lua`:
```lua
-- Add CSS classes based on table content
function Table(elem)
    local classes = {}
    
    -- Count columns
    if #elem.colspecs <= 3 then
        table.insert(classes, "narrow-table")
    else
        table.insert(classes, "wide-table")
    end
    
    -- Check if numeric
    local is_numeric = true
    pandoc.walk_block(elem, {
        Str = function(s)
            if not s.text:match("^[%d%.%-]+$") then
                is_numeric = false
            end
        end
    })
    
    if is_numeric then
        table.insert(classes, "numeric-table")
    end
    
    return pandoc.Div(elem, {class = table.concat(classes, " ")})
end
```

## Filter Order and Processing

Filters are applied in the order specified in `config/config.yaml`:

```yaml
filters:
  - pandoc-crossref              # First: process references
  - src/filters/normalize.lua    # Second: normalize content
  - src/filters/styling.lua      # Third: apply styling
```

## Advanced Filter Patterns

### Walking the Document Tree

```lua
-- Process all elements of a specific type
function Pandoc(doc)
    local links = {}
    
    -- Collect all links
    doc.blocks = pandoc.walk_block(doc.blocks, {
        Link = function(elem)
            table.insert(links, elem.target)
            return elem
        end
    })
    
    -- Add link list at end
    if #links > 0 then
        local list_items = {}
        for _, link in ipairs(links) do
            table.insert(list_items, pandoc.Plain(pandoc.Str(link)))
        end
        
        table.insert(doc.blocks, pandoc.Header(2, "All Links"))
        table.insert(doc.blocks, pandoc.BulletList(list_items))
    end
    
    return doc
end
```

### Metadata Access

```lua
-- Access document metadata
function Meta(meta)
    if meta.draft and meta.draft == true then
        -- Add draft watermark
        return meta
    end
end

function Header(elem)
    if PANDOC_DOCUMENT.meta.draft then
        elem.content:insert(pandoc.Space())
        elem.content:insert(pandoc.Str("[DRAFT]"))
    end
    return elem
end
```

### Conditional Processing

```lua
-- Different behavior for different output formats
function Image(elem)
    if FORMAT:match("html") then
        elem.attributes["loading"] = "lazy"
    elseif FORMAT:match("latex") then
        elem.attributes["width"] = "\\textwidth"
    end
    return elem
end
```

## Debugging Filters

### Enable Debug Output

```lua
-- Debug helper
local function debug_print(label, elem)
    io.stderr:write(label .. ": " .. pandoc.utils.stringify(elem) .. "\n")
end

function Header(elem)
    debug_print("Processing header", elem)
    -- Your filter logic here
    return elem
end
```

### Test Filters

Test a specific filter:

```bash
# Test filter on sample content
echo "# Test Header" | pandoc -f markdown -t native --lua-filter=src/filters/my-filter.lua

# Run with full Cowkit
docker run --rm -v "$(pwd):/app" svbaelen/cowkit -s -f html
```

## Filter Best Practices

1. **Keep filters focused**: Each filter should do one thing well
2. **Order matters**: Consider dependencies between filters
3. **Test incrementally**: Test filters with small examples first
4. **Handle edge cases**: Check for nil values and empty content
5. **Document behavior**: Add comments explaining what the filter does
6. **Performance**: Avoid expensive operations in frequently-called functions

## Common Filter Use Cases

### Academic Writing
- Auto-format citations
- Number theorems and proofs
- Handle multi-column layouts
- Process mathematical notation

### Technical Documentation
- Generate API documentation tables
- Auto-link technical terms
- Syntax highlighting enhancement
- Version stamping

### Publishing
- Add copyright notices
- Process ISBN/DOI information
- Generate indices
- Handle multi-language content

## Resources

- [Pandoc Lua Filters Guide](https://pandoc.org/lua-filters.html)
- [Pandoc Filter Examples](https://github.com/pandoc/lua-filters)
- [Lua Reference Manual](https://www.lua.org/manual/5.4/)
- [Pandoc AST Documentation](https://pandoc.org/using-the-pandoc-api.html)
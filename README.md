# Dendrogram

ES6 d3.js dendrogram visualization.

## Style

Style is expected to be addressed via css. The top-level svg is assigned a class `lgv-dendrogram`. Any style not met by the visualization module is expected to be added by the importing component.

## Environment Variables

The following values can be set via environment or passed into the class.

| Name | Type | Description |
| :-- | :-- | :-- |
| `DIMENSION_HEIGHT` | integer | height of artboard |
| `DIMENSION_WIDTH` | integer | width of artboard |
| `PARSE_DELIMETER` | string | separator on source data hierarchy path value |

## Install

```bash
# install package
npm install @lgv/dendrogram
```

## Dendrogram

### Data Format

The following values are the expected input data structure.

```json
[
    {
        id: "some|path",
        value: 1
    },
    {
        id: "some",
        value: 3
    }
]
```

### Use Module

```bash
import { Dendrogram } from "@lgv/dendrogram";

// initialize
const dg = new Dendrogram(data);

// render visualization
dg.render(document.body);
```

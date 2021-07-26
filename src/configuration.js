const configuration = {};

const configurationDimension = {
    height: process.env.DIMENSION_HEIGHT || 600,
    width: process.env.DIMENSION_WIDTH || 600
}

const configurationParse = {
    delimeter: process.env.PARSE_DELIMETER || "|"
}

export { configuration, configurationDimension, configurationParse };
export default configuration;

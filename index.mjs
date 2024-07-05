import { readFileSync, writeFileSync } from 'fs';
function transformJson(jsonData) {
    // Extract keys from the JSON
    const keys = Object.keys(jsonData);
  
    // Determine the maximum length of the arrays in the JSON values
    const maxLength = Math.max(...keys.map(key => Object.keys(jsonData[key]).length));
  
    // Initialize an array to hold the transformed data
    const transformedData = [];
  
    // Iterate over the length of the arrays and construct each row
    for (let i = 0; i < maxLength; i++) {
      const row = {};
      keys.forEach(key => {
        row[key] = jsonData[key][i.toString()] !== undefined ? jsonData[key][i.toString()] : null;
        row[key] = Number(row[key])
      });
      transformedData.push(row);
    }
  
    return transformedData;
  }
  
  // Example usage
  const data = JSON.parse(readFileSync('./data/binoculars/results.json', 'utf8'));
  
  const transformedData = transformJson(data);
writeFileSync('./data/binoculars/bino-mapped.json', JSON.stringify(transformedData))
  console.log(JSON.stringify(transformedData, null));
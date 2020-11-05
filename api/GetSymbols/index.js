let azure = require("azure-storage");

module.exports = async function (context, req) {

  context.log('JavaScript HTTP trigger function processed a request.');
  let tableSvc = azure.createTableService('miscprojectsstorage',process.env["AzureTableStorageAccessKey"]);
  let query = new azure.TableQuery()
    .where('RowKey == ?',req.query.rowkey == null ? "" : req.query.rowkey);

  let r = await queryEntities(tableSvc, 'fridaygame', query, null);
  if (r.entries.length > 0) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: r.entries[0].Data._,
      headers: {
          'Content-Type': 'application/json'
      }
    };
  } else {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {},
      headers: {
          'Content-Type': 'application/json'
      }
    };
  }
  
}

async function queryEntities(tableService, ...args) {
  return new Promise((resolve, reject) => {
      let promiseHandling = (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      };
      args.push(promiseHandling);
      tableService.queryEntities.apply(tableService, args);
  });
};
const cds = require("@sap/cds/lib");

module.exports = class AdminService extends cds.ApplicationService {
  init() {
    this.before("NEW", "Authors", genid);
    this.before("NEW", "Books", genid);
    this.before("UPDATE", "Books", async (req) => {
      const { stock } = req.data;
      if (stock < 0) req.error`${{ stock }} must be >= ${0}`;
    });
    return super.init();
  }
};

/** Generate primary keys for target entity in request */
async function genid(req) {
  const { id } = await SELECT.one.from(req.target).columns("max(ID) as id");
  req.data.ID = id - (id % 100) + 100 + 1;
}

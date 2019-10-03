var chai = require("chai");
var chaiHttp = require("chai-http");

let should = chai.should();

chai.use(chaiHttp);

describe("Server test", function() {

    before(function(){
        console.log("Before the test")
    })
    after(function(){
        console.log("After the test")
    })
  describe("/api/adduser", () => {
    it("send true if successful", () => {
      chai
        .request("http://localhost:3000")
        .post("/api/adduser")
        .send({
          inputUsername: "new user",
          inputRole: "user",
          inputEmail: "email@email.com",
          inputPassword: "password"
        })
        .end((err, res) => {
          res.body.should.be.a("boolean");
        });
    });
  });

  describe("/api/addgroup", () => {
    it("send true if successful", () => {
      chai
        .request("http://localhost:3000")
        .post("/api/addgroup")
        .send({
          groupname: "new group"
        })
        .end((err, res) => {
          res.body.should.be.a("boolean");
        });
    });
  });

  describe("/api/login", () => {
    it("send user object if successful", () => {
      chai
        .request("http://localhost:3000")
        .post("/api/login")
        .send({
          inputUsername: "lachydriver",
          inputPassword: "password"
        })
        .end((err, res) => {
          res.body.should.be.a("object");
        });
    });
  });

  describe("/api/getusers", () => {
    it("send user array if successful", () => {
      chai
        .request("http://localhost:3000")
        .get("/api/getusers")
        .end((err, res) => {
          res.body.should.be.a("array");
        });
    });
  });

  describe("/api/getgroups", () => {
    it("send groups array if successful", () => {
      chai
        .request("http://localhost:3000")
        .get("/api/getusers")
        .end((err, res) => {
          res.body.should.be.a("array");
        });
    });
  });
});

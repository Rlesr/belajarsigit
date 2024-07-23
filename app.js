const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
var connection = require("./db.js");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
var path = require('path');

app.get("/", (req, res) => {
  connection.query("SELECT * FROM siswa", function (err, rows) {
    if (err) {
      res.render("index", {
        data: "",
        error: err
      });
    } else {
      res.render("index", {
        data: rows
      });
    }
  });
});

app.get("/insert", (req, res) => {
  res.render("form", {
    nis: "",
    nama: "",
    kelas: "",
    form: 'insert'
  });
});

app.get('/edit/:nis', (req, res) => {
  const nis = req.params.nis;
  connection.query(`SELECT * FROM siswa WHERE nis = '${nis}'`, function(err, data) {
    if(err) {
      res.render('/');
    } else {
      if (data.length > 0) {
        const { nis, nama, kelas } = data[0];
        res.render('form',{
          nis: nis,
          nama: nama,
          kelas: kelas,
          form: 'edit',
          button: 'ubah',
        });
      } else {
        res.redirect('/');
      }
    }
  });
});


app.post("/ubah", (req, res) => {
  const nis = req.body.nis;
  const nama = req.body.nama;
  const kelas = req.body.kelas;
  const data = {
    nis: nis,
    nama: nama,
    kelas:kelas
  }
  connection.query(`INSERT INTO siswa SET nama ='${nama}','${kelas}' WHERE nis ='${nis}'`, function(err, result){
    if(err){
      res.render('form',{
        nis:nis,
        nama:nama,
        kelas:kelas,
        form: 'ubah',  
      });
    } else {
      res.redirect('/');
    }
  });
});

app.post("/simpan", (req, res) => {
  nis = req.body.nis;
  const nama = req.body.nama;
  const kelas = req.body.kelas;
  const data = {
    nis: nis,
    nama: nama,
    kelas:kelas
  }
  connection.query('INSERT INTO siswa SET ?', data, function(err, result){
    if(err){
      res.render('form',{
        nis:nis,
        nama:nama,
        kelas:kelas
      });
    } else {
      res.redirect('/');
    }
  });
});

app.get('/delete/:nis', (req, res) =>{
  const nis = req.params.nis;
  connection.query(`DELETE FROM siswa WHERE nis = '${nis}'`, function (err, data){
    if(err){
      res.render('/');
    } else {
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

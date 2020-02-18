const fs = require("fs");
const axios = require("axios");
const http = require("http");

function jsonData(callback){
    const url = "https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/9ed13fd53a144528568d1187c1d34073b36101fd/categories.json";
    axios.get(url).then(response => {
        callback(response);
    })
}

function sendData(callback){
    http.createServer((req, res) => {
        callback(res);
    }).listen(8080)
}

jsonData(response => {
    var htmlT = "";
    var html1 = `<!DOCTYPE html>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <html lang="en">
    <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" type="text/css">
    </head>   
    <body>
    
    <h1 class="text-center">Menu</h1>
    <div class="container-fluid py-5">
        <div class="row">
        <div class="col-2 d-none d-md-block"></div>
        <div class="col-xl-8 col-lg-8 col-md-12">
    <div class="accordion" id="accordionExample">
    `;

    var html2 = "";
    var html3 = `    </div>
    <br>
    <br>
    <br>
    </div>
    </div>
    </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
    </html>`;

    var acum = 0;
    response.data.forEach(element => {
        acum++;
        html2 += `  <div class="card">
        <div class="card-header" id="heading`+acum+`">
          <h2 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse`+acum+`" aria-expanded="true" aria-controls="collapse`+acum+`">
                `+element.name+`
            </button>
          </h2>
        </div>
        <div id="collapse`+acum+`" class="collapse show" aria-labelledby="heading`+acum+`" data-parent="#accordionExample">
          <div class="card-body">
          <div class="card-deck">`;

          for (let index = 0; index < 3; index++) {
            html2 += `<div class="card">
            <img src=`+element.products[index].image+` class="card-img-top" alt="..." width="193" height="130">
            <div class="card-body">
              <h5 class="card-title">`+element.products[index].name+`</h5>
              <p class="card-text">`+element.products[index].description+`</p>
              <p class="card-text"><strong>Price: `+element.products[index].price+`</strong></p>
              <a href="#" class="btn btn-primary">Agregar a Carrito</a>
            </div>
          </div>`
          }

        html2 += "</div></div></div></div>";
    });

    sendData(res => {
        htmlT = html1+html2+html3
        console.log(htmlT);
        res.write(htmlT);
        res.end();
    });

})









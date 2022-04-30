//Carregamento AJAX
let ajax = new XMLHttpRequest();
ajax.open("GET", "./dados.json", true)

ajax.send();

//Monitorar retorno da requisição
ajax.onreadystatechange = function() 
{
    //Especificar o container que recebe o conteduo gerado neste arquivo
    let content = document.getElementById("content");
    
    if (this.readyState == 4 && this.status == 200) {
        let data_json = JSON.parse(ajax.responseText);

        if(data_json.length == 0){
            content.innerHTML = "<div class = 'alert alert-warning' roke ='alert'>Desculpe, ainda não temos brinquedos cadastrados! </div>";
        } else {
            let html_content = "";
            for(let i=0; i<data_json.length; i++){
                    html_content += '<div class = "row"><div class = "col-12"><h2><span></span>'+data_json[i].categoria+'</h2></div></div>';
                    if(data_json[i].brinquedos.length == 0){
                        html_content = '<div class = "row"><div class = "col-12"><div class = "alert alert-warning" role="alert">Desculpe. Não temos brinquedos para esta categoria.</div></div></div>';
                    } else {
                        html_content += '<div class = "row">';

                        for(let j = 0; j<data_json[i].brinquedos.length; j++)  {
                            html_content += card_brinquedo(data_json[i].brinquedos[j].nome,data_json[i].brinquedos[j].imagem,data_json[i].brinquedos[j].valor,data_json[i].brinquedos[j].whatsapp);
                        }
                        html_content += '</div>';
                    }
            }
            content.innerHTML = html_content;
        }
    } 
}

//Template Card Brinquedo
var card_brinquedo = function(nome,imagem,valor,whatsapp)
{
    return '<div class="col-lg4">'+
                '<div class="card">'+ 
                    '<img src="'+imagem+'" class="card-img-top" alt="'+nome+'">'+
                    '<div class="card-body">'+
                        '<h5 class="card-title">'+nome+'</h5>'+
                        '<p class="card-text"><strong>Valor:</strong>'+valor+'</p>'+
                        '<div class="d-grip gap-2">'+
                            '<a href="https://api.whatsapp.com/send?phone=55'+whatsapp+'&text=Ol%C3%A1%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20brinquedo%3A%20"+'+nome+'" target ="b_blank" class="btn btn-info">Contato Proprietário</a>'+
                        '</div>'+ 
                    '</div>'+
                '</div>'+
           '</div>';
}
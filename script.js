var content;
var obj;
var resposta = document.getElementsByTagName("input");
var contador = 0;
var temp = -1;

//link com a api
var requestURL = 'https://quiz-trainee.herokuapp.com/questions';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.send();
request.onreadystatechange = function(){
    if(request.readyState === 4){
        if(request.status === 200)
        obj = JSON.parse(request.responseText);    
    } 
};

    //função para mostrar a primeira questão
    function mostrarQuestao() {
        document.getElementById("listaRespostas").style.display = "block";
        for(var i=0 ; i<obj.length ; i++){
            if(temp === -1 || resposta[i].checked != false){
            if(temp != -1){ //contador de pontos em laço for
                for(var i =0; i < obj[temp].options.length; i++){
                    contador = contador + resposta[i].checked*obj[temp]['options'][i]['value']
                }
            }
            document.getElementById("confirmar").textContent = "Próxima pergunta";
            document.getElementById("refazer").textContent = "Voltar ao início";
            temp++;
            proximaQuestao();
            }
        }
    }

    //função para mostrar as próximas questões   
    function proximaQuestao(){   
        if(temp<obj.length){
            document.getElementById("titulo").innerHTML=obj[temp].title;
            for(var i=0 ; i < obj[temp].options.length ; i++){
                if(resposta[i].checked === true){
                    resposta[i].checked = false;
                }
                document.getElementsByTagName("span")[i].innerHTML=obj[temp].options[i].answer
                resposta[i].value=obj[temp].options[i].value
            }         
        }
        else{
            finalizarQuiz();
        }
    }
    

    function finalizarQuiz() {
        var pontuacao = contador * 6.66;
        document.getElementById("listaRespostas").style.display = "none";
        document.getElementById("resultado").innerHTML = "Sua pontuação: " + pontuacao + "%";
        document.getElementById("confirmar").style.display = "none";
        
        
    }

    function refreshPage(){
        window.location.reload();
    }

    
    

    


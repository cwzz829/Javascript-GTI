function mostrarQuestao() {
    
}

function finalizarQuiz() {
    
}
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
        for(var i=0 ; i<4 ; i++){
            if(temp === -1 || resposta[i].checked != false){
            console.log(temp);
            document.getElementById("confirmar").textContent = "Próxima pergunta";
            temp++;
            proximaQuestao();
            }
        }
    }

    //função para mostrar as próximas questões   
    function proximaQuestao(){   
        if(temp < obj.length){
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
        document.getElementById("listaRespostas").style.display = "none";
        document.getElementById("resultado").innerHTML = "Sua pontuação: "  ;
        document.getElementById("confirmar").textContent = "Reiniciar quiz";
    }

    

    


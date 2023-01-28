class Paciente{
	constructor(nome, sala){
    	this.nome = nome
    	this.sala = sala
  	}

  	validarDados(){
    	for( let i in this ){
	      if(this[i] == undefined || this[i] == '' || this[i] == null){
	        return false
	      }
	    } 
	    return true
	}
}

class Bd{
	constructor(){
		let id = localStorage.getItem('id')

		if(id === null){
   		   localStorage.setItem('id', 0)
    	} 
  	}

 	getproximoId(){
    	let proximoId = localStorage.getItem('id')
    	return parseInt(proximoId) + 1
  	}

  	gravar(d){
    	let id = this.getproximoId()

       	localStorage.setItem(id, JSON.stringify(d))
    	localStorage.setItem('id', id)
  	}
  
  	recuperarTodosRegistros(){
	    let id = localStorage.getItem('id')

	    //array de pacientes
	    let pacientes = Array()

	    //recuperar todos os pacientes cadastrados em LocalStorage
	    for(let i = 1; i <= id; i++){
	      //recuperar a despesa
	      let paciente = JSON.parse(localStorage.getItem(i))

	      //existe a possibilidade de haver indices removidos ou pulados
	      if(paciente === null ){
	        continue 
	      }

	      paciente.id = i
	      pacientes.push(paciente)        
	    }
	    return pacientes
	}
	  
	remover(id){
	    localStorage.removeItem(id)

	}

	atualizar(id, sala){
		let pacienteJSON = JSON.parse(localStorage.getItem(id))
    	pacienteJSON['sala'] = sala
    	localStorage.setItem(id, JSON.stringify(pacienteJSON))
	}

}

let bd = new Bd()

function cadastrarPaciente() {
	
	let nome = document.getElementById('nome')
	let sala = '0'
	let paciente = new Paciente(nome.value, sala)
	
	if(paciente.validarDados()){
		bd.gravar(paciente)
		alert('Novo paciente!')
		nome.value = ''
	} else {
		alert('Deu ruim')
	}

	window.location.reload()
}

function carregaListaPacientes(pacientes = Array()){
	
	if(pacientes.length == 0){
		pacientes = bd.recuperarTodosRegistros()
	}
	//selecionando o elemento tbody da tabela
	let listaPacientes = document.getElementById("listaPacientes")
	listaPacientes.innerHTML = ''

	/*
	<tr>
        <td>Nome</td>
        <td>btnVerde</td>
        <td>btnAmarelo</td>
        <td>btnVermelho</td>
        </tr>
    */

    //percorrer o array pacientes, listando cada paciente de forma dinâmica
    pacientes.forEach(function(d){
    	
    	//criando a linha <tr>
    	let linha = listaPacientes.insertRow()

    	//criar as celulas <td>
    	//linha.insertCell(0).innerHTML = d.nome
    	let nomeTable = document.createElement('p')
    	nomeTable.innerHTML = d.nome
    	nomeTable.className = ''
		nomeTable.id = `id_paciente${d.id}`
		linha.insertCell(0).append(nomeTable)	

    	//criar botão sala verde
    	let btnVerde = document.createElement('button')
    	btnVerde.className = "btn btn-success border-white"
    	btnVerde.innerHTML = '<i class="fas fa-check"></i>'
    	btnVerde.id = `id_paciente${d.id}`
    	btnVerde.onclick = function(){
    		// mudar bgcolor da tr para verde
    		
    		linha.className = 'bg-success text-white'
    		
    		// atualizar a sala em que o paciente está
    		bd.atualizar(d.id, "1")
 		}


    	//criar botão sala amarelo
    	let btnAmarelo = document.createElement('button')
    	btnAmarelo.className = "btn btn-warning border-white"
    	btnAmarelo.innerHTML = '<i class="fas fa-check"></i>'
    	btnAmarelo.id = `id_paciente${d.id}`
    	btnAmarelo.onclick = function(){
    		// mudar bgcolor da tr para amarelo
    		linha.className = 'bg-warning text-dark'
    		
    		// atualizar a sala em que o paciente está
    		bd.atualizar(d.id, "2")
	 	}



    	//criar botão sala vermelho
    	let btnVermelho = document.createElement('button')
    	btnVermelho.className = "btn btn-danger border-white"
    	btnVermelho.innerHTML = '<i class="fas fa-check"></i>'
    	btnVermelho.id = `id_paciente${d.id}`
    	btnVermelho.onclick = function(){
    		// mudar bgcolor da tr para vermelho
    		linha.className = 'bg-danger text-white'

    		// atualizar a sala em que o paciente está
    		bd.atualizar(d.id, "3")
	 	}

    	

    	// criar botão de exclusão
    	let btnX = document.createElement("button")
    	btnX.className = "btn btn-secondary border-white"
    	btnX.innerHTML = '<i class="fas fa-times"></i>'
    	btnX.id = `id_paciente${d.id}`
    	btnX.onclick = function(){
    		// remover paciente do banco

    		let id = this.id.replace('id_paciente', '')
    		
    		bd.remover(id)

    		alert('Paciente saiu do sistema')
    		window.location.reload()
	 	}

	 	// ajuste bgcolor existente
	 	switch(d.sala){
    		case '1': linha.className = 'bg-success text-white'
    			break
    		case '2': linha.className = 'bg-warning text-dark'
    			break
    		case '3': linha.className = 'bg-danger text-white'
    			break
    	}

    	linha.insertCell(1).append(btnVerde)
    	linha.insertCell(2).append(btnAmarelo)
    	linha.insertCell(3).append(btnVermelho)
    	linha.insertCell(4).append(btnX)

    	//console.log(d)
    })
}

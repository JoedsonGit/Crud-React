import React from "react";
import {Button, Table, Form, Row, Col} from "react-bootstrap";
import moment from 'moment';

class Cliente extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            _id: 0,
            name:'',
            tipopessoa: '',
            cpf_cnpj:'',
            rg_ie:'',
            status:'',
            telefone1:'',
            telefone2:'',
            clientes : []
        }
    }
    // vai ser ativado quando montar o componete
    componentDidMount(){
        this.buscarCliente();
    }
    // vai ser ativado quando desmontar o componete
    componentWillUnmount(){

    }

    buscarCliente = () =>{
        fetch("http://localhost:8080/api/clientes")
            .then(resposta => resposta.json())
            .then(dados => {
                this.setState({clientes : dados})
            }
            )
        
    }

    deletarCliente = (id) => {
        fetch("http://localhost:8080/api/clientes/"+id,{method: 'DELETE'})
            .then(resposta => {
                if(resposta.ok){
                    this.buscarCliente();
                }
            }

            )
    }

    carregarDados = (id) => {
        fetch("http://localhost:8080/api/clientes/"+id,{method: 'GET'})
        .then(resposta => resposta.json())
        .then(cliente => {
            this.setState(
                    {
                    _id:        cliente._id,
                    name:       cliente.name,
                    tipopessoa: cliente.tipopessoa,
                    cpf_cnpj:   cliente.cpf_cnpj,
                    rg_ie:      cliente.rg_ie,
                    status:     cliente.status,
                    telefone1:  cliente.telefone1,
                    telefone2:  cliente.telefone2
                    }
                )
        }
        )
    }

    cadastraCliente = (cliente) => {
        fetch("http://localhost:8080/api/clientes/",
            {method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
            }
        )
        .then(resposta => {
            if(resposta.ok){
                this.buscarCliente();
            }else{
                alert('Não foi possivel cadastrar o aluno !');
            }
            
        }

        )
    }

    atualizarCliente = (cliente) => {
        fetch("http://localhost:8080/api/clientes/"+cliente._id,
            {method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(cliente)
            }
        )
        .then(resposta => {
            if(resposta.ok){
                this.buscarCliente();
            }else{
                alert('Não foi possivel atualizar o aluno !');
            }
            
        }

        )
    }    

    renderTabela(){
        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nome</th>
                        <th>Tipo Pessoa</th>
                        <th>CPF / CNPJ</th>
                        <th>RG / IE</th>
                        <th>Data Cadastro</th>
                        <th>Status</th>
                        <th>Telefone Celular</th>
                        <th>Telefone Fixo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
  
                {
                    this.state.clientes.map((cliente) =>
                        <tr>
                            <th>{cliente._id}</th>
                            <th>{cliente.name}</th>
                            <th>{cliente.tipopessoa}</th>
                            <th>{cliente.cpf_cnpj}</th>
                            <th>{cliente.rg_ie}</th>
                            <th>{moment(cliente.datacadastro).format('DD/MM/YYYY')}</th>
                            <th>{cliente.status.replace('1','Ativo').replace('0','Inativo')}</th>
                            <th>{cliente.telefone1}</th>
                            <th>{cliente.telefone2}</th>
                            <th> 
                                <Button variant="secondary"  onClick={() => this.carregarDados(cliente._id)}>Atualizar</Button>
                                <Button variant="danger" onClick={() => this.deletarCliente(cliente._id)}>Excluir</Button>    
                            </th>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        )
    }

    atualizaNome = (e) => {
        this.setState(
            {
                name: e.target.value
            }
        )
    }


    atualizaTipopessoa = (e) => {
        this.setState(
            {
                tipopessoa: e.target.value
            }
        )
    }

    atualizaCpf_cnpj = (e) => {
        this.setState(
            {
                cpf_cnpj: e.target.value
            }
        )
    }
    
    atualizaRg_ie = (e) => {
        this.setState(
            {
                rg_ie: e.target.value
            }
        )
    }    

    atualizaStatus = (e) => {
        this.setState(
            {
                status: e.target.value
            }
        )
    }
    
    atualizaTelefone1 = (e) => {
        this.setState(
            {
                telefone1: e.target.value
            }
        )
    }    

    atualizaTelefone2 = (e) => {
        this.setState(
            {
                telefone2: e.target.value
            }
        )
    }    

    submit(){
        if(this.state._id == 0){
            const cliente = {
                name:       this.state.name,
                tipopessoa: this.state.tipopessoa,
                cpf_cnpj:   this.state.cpf_cnpj,
                rg_ie:      this.state.rg_ie,
                status:     this.state.status,
                telefone1:  this.state.telefone1,
                telefone2:  this.state.telefone2
               }
               this.cadastraCliente(cliente);
        }else{
       const cliente = {
        _id:        this.state._id,
        name:       this.state.name,
        tipopessoa: this.state.tipopessoa,
        cpf_cnpj:   this.state.cpf_cnpj,
        rg_ie:      this.state.rg_ie,
        status:     this.state.status,
        telefone1:  this.state.telefone1,
        telefone2:  this.state.telefone2
       }
       this.atualizarCliente(cliente);
        }

    }

    reset = () => {
        this.setState(
            {
            _id:0,
            name:'',
            tipopessoa:'',
            cpf_cnpj:'',
            rg_ie:'',
            status:'',
            telefone1:'',
            telefone2:''            
            }
        )
    }


render(){
    return(
        <div>
                <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridId">
                            <Form.Label>Codigo</Form.Label>
                            <Form.Control type="text" placeholder="Codigo" value={this.state._id} readOnly={true}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome" value={this.state.name} onChange={this.atualizaNome}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTipoPessoa">
                            <Form.Label>Tipo Pessoa: (PF) para Física - (PJ) para Jurídica</Form.Label>
                            <Form.Select aria-label="Default select example" value={this.state.tipopessoa} onChange={this.atualizaTipopessoa}>
                            <option value="PF">PF</option>
                            <option value="PJ">PJ</option>
                            </Form.Select>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCpfCnpj">
                            <Form.Label>Cpf/Cnpj</Form.Label>
                            <Form.Control type="text" placeholder="Cpf/Cnpj" value={this.state.cpf_cnpj} onChange={this.atualizaCpf_cnpj}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridRgIe">
                            <Form.Label>Rg/Ie</Form.Label>
                            <Form.Control type="text" placeholder="Rg/Ie" value={this.state.rg_ie} onChange={this.atualizaRg_ie}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTipoPessoa">
                            <Form.Label>Status</Form.Label>
                            <Form.Select aria-label="Default select example" value={this.state.status} onChange={this.atualizaStatus}>
                            <option value="1">Ativo</option>
                            <option value="0">Inativo</option>
                            </Form.Select>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} controlId="formGridTelefone1">
                            <Form.Label>Telefone Principal</Form.Label>
                            <Form.Control type="text" placeholder="Telefone Principal" value={this.state.telefone1} onChange={this.atualizaTelefone1}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTelefone2">
                            <Form.Label>Telefone Secundario</Form.Label>
                            <Form.Control type="text" placeholder="Telefone Secundario" value={this.state.telefone2} onChange={this.atualizaTelefone2}/>
                            </Form.Group>   

                        </Row>
                        <Button variant="primary" type="submit" onClick={() => this.submit()}>Salvar</Button>                         
                        <Button variant="success" type="submit" onClick={() => this.reset()}>Novo</Button>                         
                    </Form>     
                    

            {this.renderTabela()}
        </div>
        
    )
}


}
export default Cliente;
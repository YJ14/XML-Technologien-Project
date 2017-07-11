const React = require('react');
const ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
let dps = require('dbpedia-sparql-client').default;

class PaintingModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            paintings: [],
            painting: {},
            info: ''
        };
        this.close = this.close.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.showModal !== this.state.showModal) {
            this.setState({
                showModal: nextProps.showModal
            });
        }
        if (nextProps.selectedUrl !== this.state.selectedUrl) {
            let painting = this.findPainting(nextProps.paintings, nextProps.selectedUrl);
            this.setState({
                paintings: nextProps.paintings,
                painting: painting[0]
            });
        }
    }
    findPainting(paintings, selectedUrl) {
        return paintings.filter((painting) => painting.image_link === selectedUrl)
    }
    close() {
        this.setState({
            showModal: false
        });
    }
    dbpediaQuery() {
        //let query = 'SELECT ?p ?o WHERE { db:Danny_Kaye ?p ?o }';
        let query = 'SELECT DISTINCT ?Concept WHERE {[] a ?Concept} LIMIT 10';

        dps.client()
            .query(query)
            .timeout(15000) // optional, defaults to 10000
            .asJson() // or asXml()
            .then(function(r) {
                console.log(r);
                this.setState({
                    info: r.results.bindings[0]
                });
            }).catch(function(e) { console.log(e) });
    }

    render() {
        return (
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.painting.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div align="center">
                            <img src={this.props.selectedUrl} width="555" height="450" />
                            <p> <strong>TITLE : </strong> <br /> {this.state.painting.title} </p>
                            <p> <strong>ARTIST : </strong> <br /> {this.state.painting.artist} </p>
                            <p> <strong>DATE : </strong> <br /> {this.state.painting.date} </p>
                            <p> <strong>CATEGORY : </strong> <br /> {this.state.painting.category} </p>
                            <p> <strong>INSCRIPTION :</strong> <br /> {this.state.painting.inscription} </p>
                            <p> <strong>Query 1 :</strong> <br /> {this.state.info.toString()} </p>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <button onClick={this.dbpediaQuery}>doQuery</button>
                        <button onClick={this.close}>close</button>
                    </Modal.Footer>
                </Modal>
        );
    }
};


module.exports = PaintingModal;
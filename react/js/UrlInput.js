var Url = Backbone.Model.extend({
    defaults: {
        url: ""
    },
    validate: function(attrs){
        if(!/^(http|https):\/\/[^ "]+$/.test(attrs.url)){
            return  "De opgegeven URL is onjuist";
        }
    }
});


var UrlInput = React.createClass({
    getInitialState: function () {
        return {
            answer: {url:new Url()},
            role: "editor",
            id: 40,
        };
    },
    componentDidMount: function () {
        return;
        //voorbeeld van de proportie data ophalen
        this.serverRequest = $.get("****", function (result) {
            this.setState({
                answer: result.answer,
                id: result.id
            });
        }.bind(this));
    },
    componentWillUnmount: function () {
        this.serverRequest.abort();//cancel request
    },
    handleSubmit:function(event){
        event.preventDefault();
        var url = this.state.answer.url;
        if(!url.isValid()) return;
        var id = this.state.id;
        $.ajax({
            url: 'http://localhost:3000/answers/' + id,
            type: 'post',
            dataType: 'json',
            success: function (data) {
                alert("verzonden!");
            },
            error:function(){
                alert("Er is iets fout gegaan");
            },
            data: {
                answer:{
                    url:url.get("url")
                }
            }
        });
        alert("je gegevens zijn opgeslagen");
    },
    handleUrlChange:function(event){
        this.state.answer.url.set("url",event.target.value);
        this.forceUpdate();
    },
    render: function () {
        var url = this.state.answer.url;
        var classNames = "alert alert-danger" + (url.isValid() ? "hidden" : "");
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            Link:
                        </div>
                        <div>
                            <div className="col-md-6">
                                <input
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Url" 
                                    value={this.state.answer.url.get()}
                                    onChange={this.handleUrlChange}
                                />
                                <div className={classNames} role="alert">
                                    {url.isValid() ? "" : url.validationError}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-info">
                                    save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
});

ReactDOM.render(
    <UrlInput /> ,
    document.getElementsByClassName("container")[0]
);

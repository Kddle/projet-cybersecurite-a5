(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{121:function(e,t){},123:function(e,t){},157:function(e,t){},158:function(e,t){},204:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(90),r=a.n(s),l=(a(97),a(7)),c=a(8),i=a(10),d=a(9),u=a(11),m=a(1),h=(a(99),a(15)),p=a.n(h),b=a(91),v=a.n(b),f=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={isLoading:!1,username:"",password:"",formError:!1,errorMsg:""},a.handleConnexionClick=a.handleConnexionClick.bind(Object(m.a)(Object(m.a)(a))),a.onUsernameChanged=a.onUsernameChanged.bind(Object(m.a)(Object(m.a)(a))),a.onPasswordChanged=a.onPasswordChanged.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleConnexionClick",value:function(e){var t=this;e.preventDefault(),0!==this.state.username.length&&0!==this.state.password.length?(this.state.formError?this.setState({formError:!1,errorMsg:"",isLoading:!0}):this.setState({isLoading:!0}),p.a.post("/api/Auth",{username:this.state.username,password:this.state.password}).then(function(e){sessionStorage.setItem("alphapar.token",e.data),sessionStorage.setItem("alphapar.username",t.state.username);var a=v.a.createHmac("sha256",t.state.username).update(t.state.password).digest("hex");sessionStorage.setItem("alphapar.pwd",a),t.props.loginCb(e.data)}).catch(function(e){t.setState({formError:!0,errorMsg:"Error : ".concat(e.response.status," - ").concat(e.response.statusText)})}).then(function(){t.setState({isLoading:!1})})):this.setState({formError:!0,errorMsg:"Veuillez entrer votre nom d'utilisateur et votre mot de passe.",isLoading:!1})}},{key:"onUsernameChanged",value:function(e){e.preventDefault(),this.setState({username:e.target.value})}},{key:"onPasswordChanged",value:function(e){e.preventDefault(),this.setState({password:e.target.value})}},{key:"render",value:function(){return o.a.createElement("section",{id:"cover"},o.a.createElement("div",{id:"cover-caption"},o.a.createElement("div",{id:"container",className:"container"},o.a.createElement("div",{className:"row text-white"},o.a.createElement("div",{className:"col-sm-6 offset-sm-3 text-center"},o.a.createElement("h1",{className:"display-4"},"Portail AlphaPar"),o.a.createElement("div",{className:"info-form"},o.a.createElement("form",{action:"",className:"justify-content-center"},o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{type:"text",className:"form-control",value:this.state.username,onChange:this.onUsernameChanged,placeholder:"Nom d'utilisateur..."})),o.a.createElement("div",{className:"form-group"},o.a.createElement("input",{type:"password",className:"form-control",placeholder:"Mot de passe...",value:this.state.password,onChange:this.onPasswordChanged})),o.a.createElement("button",{className:"btn btn-success".concat(this.state.isLoading?" disabled":""),onClick:this.handleConnexionClick},"Connexion")),this.state.formError?o.a.createElement("h6",{className:"login-error"},this.state.errorMsg):null,this.state.isLoading?o.a.createElement("div",{className:"lds-ring"},o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null),o.a.createElement("div",null)):null))))))}}]),t}(o.a.Component),g=0,E=1,y=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h4",null,"Loading..."))}}]),t}(o.a.Component),j=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h3",null,this.props.data.response.data.Message))}}]),t}(o.a.Component),C=a(5),k=a.n(C),O=function(e){function t(e){return Object(l.a)(this,t),Object(i.a)(this,Object(d.a)(t).call(this,e))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,k.a.map(this.props.data,function(t,a){return o.a.createElement("button",{onClick:function(){return e.props.addItem(t)},key:a},t.Name)}))}}]),t}(o.a.Component),I=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={data:null,error:null,modalContent:null,modalType:""},a.onInputChanged=a.onInputChanged.bind(Object(m.a)(Object(m.a)(a))),a.rqAddItemArray=a.rqAddItemArray.bind(Object(m.a)(Object(m.a)(a))),a.deleteItem=a.deleteItem.bind(Object(m.a)(Object(m.a)(a))),a.showItemDetails=a.showItemDetails.bind(Object(m.a)(Object(m.a)(a))),a.save=a.save.bind(Object(m.a)(Object(m.a)(a))),a.cancel=a.cancel.bind(Object(m.a)(Object(m.a)(a))),a.closeModal=a.closeModal.bind(Object(m.a)(Object(m.a)(a))),a.addItemArray=a.addItemArray.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"onInputChanged",value:function(e){var t={};t[e.target.id.split("_")[1]]=e.target.value,console.log(t),this.setState({data:Object.assign(this.state.data,t)})}},{key:"componentDidMount",value:function(){var e=this;p.a.get("/api/"+this.props.route+"/"+this.props.itemId,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(t){e.setState({data:t.data})}).catch(function(t){e.setState({error:t})})}},{key:"deleteItem",value:function(e,t){var a=k.a.filter(this.state.data[t],function(t){return t.ID!==e}),n={};n[t]=a;var o=Object.assign(n,this.state.data);console.log(o),this.setState({data:o})}},{key:"showItemDetails",value:function(e,t){var a="Customers"===t?"Plans":"Machines";this.props.setRoute(a,E,e)}},{key:"rqAddItemArray",value:function(e){var t=this,a="Composition"===e?"Machines":e;console.log("Modal type : "+a),p.a.get("/api/"+a,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(n){console.log(n),console.log(t.state.data[e]);var o=k.a.differenceBy(n.data,t.state.data[e],"ID");console.log(o),t.setState({modalType:a,modalContent:o,modalCallingProperty:e})}).catch(function(e){return t.setState({error:e})})}},{key:"addItemArray",value:function(e){var t=this.state.data[this.state.modalCallingProperty];if(null===t&&(t=[]),Array.isArray(t)){t.push(e);var a={};a[this.state.modalCallingProperty]=t,this.setState({data:Object.assign(this.state.data,a)}),this.closeModal()}else console.log("weird behaviour")}},{key:"closeModal",value:function(){this.setState({modalContent:null,modalType:"",modalCallingProperty:""}),document.getElementById("closeModalBtn").click()}},{key:"save",value:function(e){var t=this;e.preventDefault(),p.a.put("/api/"+this.props.route,this.state.data,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(e){t.props.setRoute(t.props.route,g)}).catch(function(e){t.setState({error:e})})}},{key:"cancel",value:function(e){e.preventDefault(),this.props.setRoute(this.props.route,g)}},{key:"render",value:function(){var e=this,t=null!==this.state.data?Object.keys(this.state.data).sort():[],a=null===this.state.data?o.a.createElement(y,null):o.a.createElement("div",{className:"details-container"},k.a.map(t,function(t,a){if("ID"===t||"LastUpdated"===t)return null;if(null===e.state.data[t]&&("Plans"===t||"Composition"===t))return o.a.createElement("div",{className:"form-group",key:a},o.a.createElement("label",{htmlFor:"property_".concat(t)},t),o.a.createElement("button",{type:"button",className:"btn btn-success","data-toggle":"modal","data-target":"#detailComponentModal",onClick:function(){return e.rqAddItemArray(t)}},"Add"));if(Array.isArray(e.state.data[t])){var n=e.state.data[t];return o.a.createElement("div",{className:"form-group",key:a},o.a.createElement("label",{htmlFor:"property_".concat(t,"_").concat(a)},t),o.a.createElement("button",{type:"button",className:"btn btn-success","data-toggle":"modal","data-target":"#detailComponentModal",onClick:function(){return e.rqAddItemArray(t)}},"Add"),n.length>0?o.a.createElement("div",{className:"container",id:"property_".concat(t,"_").concat(a)},o.a.createElement("div",{className:"row"},k.a.map(Object.keys(n[0]),function(e){return"ID"===e||"LastUpdated"===e?null:o.a.createElement("div",{className:"col-md",key:"arr_header_".concat(e)},o.a.createElement("h4",null,e))}),o.a.createElement("div",{className:"col-md"},o.a.createElement("h4",null,"Actions"))),k.a.map(n,function(a,n){return o.a.createElement("div",{className:"row",key:"".concat(t,"_row_").concat(n)},k.a.map(Object.keys(a),function(e){return"ID"===e||"LastUpdated"===e?null:o.a.createElement("div",{className:"col-md",key:"arr_prop_".concat(e)},o.a.createElement("p",null,Array.isArray(a[e])?a[e].length:a[e]))}),o.a.createElement("div",{className:"col-md"},o.a.createElement("button",{className:"btn btn-danger",onClick:function(){return e.deleteItem(a.ID,t)}},"Delete"),o.a.createElement("button",{className:"btn btn-primary",onClick:function(){return e.showItemDetails(a.ID,e.props.route)}},"Details")))})):null)}return o.a.createElement("div",{className:"form-group",key:a},o.a.createElement("label",{htmlFor:"property_".concat(t)},t),o.a.createElement("input",{type:"text",value:e.state.data[t],id:"property_".concat(t),onChange:e.onInputChanged}))}));return null!==this.state.error?o.a.createElement(j,{data:this.state.error}):o.a.createElement("div",{className:"details"},o.a.createElement("h3",null,"".concat(this.props.route," #").concat(this.props.itemId)),o.a.createElement("br",null),o.a.createElement("div",{className:"details-container"},a),o.a.createElement("div",{className:"details-action"},o.a.createElement("button",{className:"btn btn-success",onClick:this.save},"Save"),o.a.createElement("button",{className:"btn btn-danger",onClick:this.cancel},"Cancel")),o.a.createElement("div",{className:"modal fade",id:"detailComponentModal",tabIndex:"-1",role:"dialog","aria-labelledby":"detailComponentModalLabel","aria-hidden":"true"},o.a.createElement("div",{className:"modal-dialog",role:"document"},o.a.createElement("div",{className:"modal-content"},o.a.createElement("div",{className:"modal-header"},o.a.createElement("h5",{className:"modal-title",id:"detailComponentModalLabel"},"Add ".concat(this.state.modalType)),o.a.createElement("button",{id:"closeModalBtn",type:"button",className:"close","data-dismiss":"modal","aria-label":"Close"},o.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),o.a.createElement("div",{className:"modal-body"},null!==this.state.modalContent?o.a.createElement(O,{data:this.state.modalContent,addItem:this.addItemArray}):o.a.createElement(y,null)),o.a.createElement("div",{className:"modal-footer"},o.a.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:this.closeModal},"Close"))))))}}]),t}(o.a.Component),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={modalData:null,modalField:null,error:null},a.addItem=a.addItem.bind(Object(m.a)(Object(m.a)(a))),a.closeModal=a.closeModal.bind(Object(m.a)(Object(m.a)(a))),a.onInputChanged=a.onInputChanged.bind(Object(m.a)(Object(m.a)(a))),a.onItemAdded=a.onItemAdded.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;k.a.isNil(this.props.route)||p.a.get("/api/Schema/"+this.props.route,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(t){var a={};null!==t.data&&k.a.forEach(t.data,function(e){return a[e]=""}),e.setState({modalField:t.data,modalData:a})}).catch(function(t){console.error(t.response.status+" - "+t.response.statusText),e.setState({error:t})})}},{key:"onInputChanged",value:function(e){var t={};t[e.target.id.split("_")[1]]=e.target.value,this.setState({modalData:Object.assign(this.state.modalData,t)})}},{key:"closeModal",value:function(e){e&&e.preventDefault();var t=this.state.modalData;k.a.forEach(Object.keys(t),function(e){t[e]=""}),this.setState({modalData:Object.assign(this.state.modalData,t)});var a=document.getElementById("closeModalBtn");a&&a.click()}},{key:"onItemAdded",value:function(e,t){this.closeModal()}},{key:"addItem",value:function(e){var t=this;e.preventDefault();var a=!1;k.a.forEach(Object.keys(this.state.modalData),function(e){null!==t.state.modalData[e]&&0!==t.state.modalData[e].length||(a=!0)}),console.log("fin"),a?this.setState({error:{response:{data:{Message:"Please fill in all fields."}}}}):this.props.addItem(this.state.modalData)}},{key:"render",value:function(){var e=this,t=null===this.state.modalData?o.a.createElement(y,null):o.a.createElement("div",null,k.a.map(Object.keys(this.state.modalData),function(t,a){return o.a.createElement("div",{className:"form-group",key:a},o.a.createElement("label",{htmlFor:"field_"+t},t," : "),o.a.createElement("input",{type:"text",id:"field_"+t,value:e.state.modalData[t],onChange:e.onInputChanged}))}));return o.a.createElement("div",{className:"modal-content"},o.a.createElement("div",{className:"modal-header"},o.a.createElement("h5",{className:"modal-title",id:"listComponentModalLabel"},"Add ".concat(this.props.route)),o.a.createElement("button",{id:"closeModalBtn",type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",onClick:this.closeModal},o.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),o.a.createElement("div",{className:"modal-body"},t),o.a.createElement("div",{className:"modal-footer"},null!==this.state.error?o.a.createElement(j,{data:this.state.error}):null,o.a.createElement("button",{type:"button",className:"btn btn-success",onClick:this.addItem},"Add"),o.a.createElement("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:this.closeModal},"Close")))}}]),t}(o.a.Component),D=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={listHeaders:[],listContent:[],error:null},a.deleteItem=a.deleteItem.bind(Object(m.a)(Object(m.a)(a))),a.showItemDetails=a.showItemDetails.bind(Object(m.a)(Object(m.a)(a))),a.getData=a.getData.bind(Object(m.a)(Object(m.a)(a))),a.addItem=a.addItem.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"deleteItem",value:function(e){var t=this;console.log("Delete requested on item : "+e),console.log("Current state :",this.state),console.log("Current props :",this.props),p.a.delete("/api/"+this.props.route+"/"+e,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(e){return t.props.setRoute(t.props.route,g)}).catch(function(e){return t.setState({error:e})})}},{key:"showItemDetails",value:function(e){console.log("Details requested on item : "+e),console.log("Current state :",this.state),console.log("Current props :",this.props),this.props.setRoute(this.props.route,E,e)}},{key:"addItem",value:function(e,t){var a=this;p.a.post("/api/"+this.props.route,e,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(e){document.getElementById("closeModalBtn").click(),a.props.setRoute(a.props.route,g),t&&t(null,e)}).catch(function(e){console.log(e),a.setState({error:e}),t&&t(e,null)})}},{key:"getData",value:function(){var e=this;null!==sessionStorage.getItem("alphapar.token")&&p.a.get("/api/"+this.props.route,{headers:{Authorization:"Bearer ".concat(sessionStorage.getItem("alphapar.token"))}}).then(function(t){var a=[];t.data.length>0&&(a=k.a.filter(Object.keys(t.data[0]),function(e){return"ID"!==e})),e.setState({listHeaders:a,listContent:t.data,error:null})}).catch(function(t){console.log(t),e.setState({error:t})})}},{key:"componentDidMount",value:function(){this.getData()}},{key:"render",value:function(){var e=this;return null!==this.state.error?o.a.createElement(j,{data:this.state.error}):o.a.createElement("div",{className:"list-container"},o.a.createElement("h3",{className:"list-title"},this.props.route," :"),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement("button",{type:"button",className:"btn btn-success","data-toggle":"modal","data-target":"#listComponentModal"},"Add")),0===this.state.listContent.length?o.a.createElement("h3",null,"No results."):o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row align-items-center"},k.a.map(this.state.listHeaders,function(e){return o.a.createElement("div",{className:"col-md",key:e},o.a.createElement("h4",null,e))}),o.a.createElement("div",{className:"col col-md"},o.a.createElement("h4",null,"Actions"))),k.a.map(this.state.listContent,function(t,a){return console.log(t),o.a.createElement("div",{className:"row align-items-center",key:a},k.a.map(e.state.listHeaders,function(e,n){return o.a.createElement("div",{className:"col-md",key:a+"_"+n},o.a.createElement("p",null,Array.isArray(t[e])?t[e].length:t[e]))}),o.a.createElement("div",{className:"col-md col"},o.a.createElement("button",{onClick:function(){return e.deleteItem(t.ID)}},"Supprimer"),o.a.createElement("button",{onClick:function(){return e.showItemDetails(t.ID)}},"Details")))})),o.a.createElement("div",{className:"modal fade",id:"listComponentModal",tabIndex:"-1",role:"dialog","aria-labelledby":"listComponentModalLabel","aria-hidden":"true"},o.a.createElement("div",{className:"modal-dialog",role:"document"},o.a.createElement(N,{route:this.props.route,addItem:this.addItem}))))}}]),t}(o.a.Component),w=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={displayComponent:null},a.setRoute=a.setRoute.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"setRoute",value:function(e,t,a){var n=this;this.setState({displayComponent:null}),setTimeout(function(){switch(t){case g:n.setState({displayComponent:o.a.createElement(D,{route:e,setRoute:n.setRoute})});break;case E:n.setState({displayComponent:o.a.createElement(I,{route:e,setRoute:n.setRoute,itemId:a})});break;default:n.setState({displayComponent:o.a.createElement(D,{route:"Customers",setRoute:n.setRoute})})}},10)}},{key:"componentDidMount",value:function(){this.setRoute("Customers",g)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"home-container"},o.a.createElement("div",{id:"wrapper",className:"toggled"},o.a.createElement("div",{id:"sidebar-wrapper"},o.a.createElement("ul",{className:"sidebar-nav"},o.a.createElement("li",{className:"sidebar-brand"},o.a.createElement("button",{onClick:function(){return e.setRoute("Customers",g)}},"Alphapar Portal")),o.a.createElement("li",{className:"sidebar-route"},o.a.createElement("button",{onClick:function(){return e.setRoute("Customers",g)}},"Clients")),o.a.createElement("li",{className:"sidebar-route"},o.a.createElement("button",{onClick:function(){return e.setRoute("Plans",g)}},"Plans")),o.a.createElement("li",{className:"sidebar-route"},o.a.createElement("button",{onClick:function(){return e.setRoute("Machines",g)}},"Machines")))),o.a.createElement("div",{id:"page-content-wrapper"},o.a.createElement("div",{className:"container-fluid"},this.state.displayComponent))))}}]),t}(o.a.Component),A=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={jwtToken:null,jwtExpirationDate:null},a.setAuthInfos=a.setAuthInfos.bind(Object(m.a)(Object(m.a)(a))),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"setAuthInfos",value:function(e){this.setState({jwtToken:e})}},{key:"componentDidMount",value:function(){null!==sessionStorage.getItem("alphapar.token")&&null===this.state.jwtToken&&this.setState({jwtToken:sessionStorage.getItem("alphapar.token")})}},{key:"render",value:function(){return null!=this.state.jwtToken?o.a.createElement(w,null):o.a.createElement(f,{loginCb:this.setAuthInfos})}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},92:function(e,t,a){e.exports=a(204)},97:function(e,t,a){},99:function(e,t,a){}},[[92,2,1]]]);
//# sourceMappingURL=main.94bcd46a.chunk.js.map
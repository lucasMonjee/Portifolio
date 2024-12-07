class formsubmitButton{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formsubmitButton = document.querySelector(settings.button);
        if(this.form){
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this); 

    }

    displaySuccess(){   
        this.form.innerHTML = this.settings.success;

    }

    displayError(){    
        this.form.innerHTML = this.settings.error;
    }

    getFormObject(){
        const FormObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach(field => {

           FormObject[field.getAttribute("name")] = field.value;
        });
        return FormObject;
    }

    onsubmission(event){
        event.preventDefault();
        this.formsubmitButton.disabled = true;
        this.formsubmitButton.innerHTML = "Enviando...";
    }

    async sendForm(event){
        this.onsubmission(event);
       try{ 
        await fetch(this.url,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
        // Redireciona para a mesma página após envio bem-sucedido
        setTimeout(() => {
            window.location.href = window.location.href;
        }, 3000);  // Aguarda 3 segundos antes de recarregar a página

    }catch(error){
        this.displayError();
        console.error('Error:', error);
        throw new Error(error);  
    } finally {
        // Reativa o botão independentemente do sucesso ou erro
        this.formsubmitButton.disabled = false;
        this.formsubmitButton.innerHTML = "Enviar";
    }

       
    }

    init(){
        this.formsubmitButton.addEventListener("click", this.sendForm);
        return this;
    }

    
}

const formSubmit = new formsubmitButton({
    form: '[data-form]',
    button: '[data-button]',
    success: '<h1 class="success">Mensagem enviada!</h1>',
    error: '<h1 class= "error">Não foi possivel enviar sua mensagem.</h1>'
});

formSubmit.init();



const modal = document.getElementById('modal');
const form = document.querySelector('form');
const closeBtn = document.getElementById('close');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Mostra o modal
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
        form.submit();  // Envia o formulário
    }, 3000);
});

closeBtn.addEventListener('click', () => modal.style.display = "none");

window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = "none";
});

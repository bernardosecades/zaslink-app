import {useForm} from "react-hook-form";
import {contentValidator, passwordValidator} from "./validator";

const CreateSecretForm = () => {
    const {register, formState: { errors }, handleSubmit} = useForm()
    const makeRequest = (data) => {
        let config = {
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        fetch(process.env.REACT_APP_API_BASE_URL + '/v1/secret', config)
            .then(response => response.json()) // Parse the JSON from the response
            .then(data => {
                const divResponse = document.getElementById('response_secret')
                divResponse.style.display = 'block';
                const url = process.env.REACT_APP_API_BASE_URL + '/v1/secret/' + data.id
                divResponse.textContent = url
                console.log('Success:', data); // Handle the successful response
            })
            .catch((error) => {
                console.error('Error:', error); // Handle errors
            });
    }

    return <div>
        <div className="response_secret" id="response_secret"><p>https://www.zaslink.com/secret/3656181b-61cb-47c4-bf50-29dc7469f1dc asdas d as das ads ads. </p></div>
        <form className="form" onSubmit={handleSubmit(makeRequest)}>
            <h2 className="form__title">ZasLink</h2>
            <p className="form__paragraph">Comparte passwords, links, ...</p>
            <div className="form__container">
                <div className="form__group">
                    <input type="textarea" id="content" className="form__input" placeholder=" " {...register('content', {
                        validate: contentValidator
                    })}/>
                    {errors.content && <p className="form__error">Content can not be empty or exceed of 10000 characters</p>}
                    <label htmlFor="content" className="form__label">Content</label>
                    <span className="form__line"></span>
                </div>
                <div className="form__group">
                    <input type="password" id="password" className="form__input" placeholder=" " {...register('pwd', {
                        validate: passwordValidator
                    })}/>
                    {errors.pwd && <p className="form__error">Password should have between 4 and 12 characters</p>}
                    <label htmlFor="password" className="form__label" >Passphrase (Optional)</label>
                    <span className="form__line"></span>
                </div>
                <div className="form__group">
                    <label htmlFor="expiration" className="form__label_expiration">Expiration</label>
                    <select className="form__input" id="expiration"  {...register('expiration')}>
                        <option value="7d">7 days</option>
                        <option value="3d">3 days</option>
                        <option value="1d">1 day</option>
                        <option value="12h">12 hours</option>
                        <option value="4h">4 hours</option>
                        <option value="1h">1 hour</option>
                        <option value="30m">30 m</option>
                        <option value="5m">5m</option>
                    </select>
                </div>

                <input type="submit" value="Create Secret" className="form__submit"/>

            </div>
        </form>
    </div>
}

export default CreateSecretForm;
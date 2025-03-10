import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji, { getUnicode } from 'emoji-dictionary';
import './NewCardForm.css';
// import { truncate } from 'fs';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: '',
            emoji: ''
        }
    }

    onChangeHandler = (event) => {
        const field = {}
        field[event.target.name] = event.target.value;

        this.setState(field);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onPostMessageCallback({
            text: this.state.text,
            emoji: this.state.emoji
        });

        this.setState({
            text: '',
            emoji: ''
        });
    }

    render() {

        const { text } = this.state;

        const emojiList = EMOJI_LIST.map((emoji, i) => {
            return (
                <option key={i} value={emoji}>
                    {getUnicode(emoji)}
                </option>

            )

        })

        return (

            <div className='new-card-form'>
                <h3 className='new-card-form__header'>Add a New Message to the Board</h3>

                <form className='new-card-form__form' onSubmit={this.handleSubmit}>
                    <div>
                        <label className='new-card-form__form-label' htmlFor='text'>Message: </label>
                        <input
                            type='text'
                            name='text'
                            value={text}
                            onChange={this.onChangeHandler}
                            className='new-card-form__form-textarea'
                        />
                    </div>


                    <div>
                        <label className='new-card-form__form-label' htmlFor='emoji'>Add an Emoji</label>
                        <select name='emoji' value={emoji} onChange={this.onChangeHandler}>
                            {emojiList}
                        </select>
                    </div>

                    <div>
                        <input type='submit' value='Add Message' className="new-card-form__form-button" />
                    </div>
                </form>
            </div>
        )};
}

NewCardForm.propTypes = {
    onPostMessageCallback: PropTypes.func.isRequired

}
export default NewCardForm;
import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state= {
        charList: [],
        error: false,
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        }) 
    }
    
    render() {
        const {charList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ?  <CharListItem charList={charList}/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">                
                    {content}                        
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = ({charList}) => {
    return charList.map(({name, thumbnail, id}) => {
        const changeFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? {objectFit: 'contain'} : null;
        return (
        <li className="char__item char__item_selected" key={id}>
            <img src={thumbnail} alt={name} style={changeFit}/>
            <div className="char__name">{name}</div>
        </li>  
        )
    })
}

export default CharList;
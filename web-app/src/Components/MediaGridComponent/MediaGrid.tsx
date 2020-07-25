import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';
import {IUserInput} from '../../Common/Interfaces';

interface IState {
    links: string|null;   
}
interface IMediaGridProps {
    SearchQuery: (string | null);
}
function MediaGrid(props: IMediaGridProps) {

    const [ItemArray, setItemArray] = useState<IState[]>([{ links: '' }]);

    useEffect(() => {
        fetch('https://pixabay.com/api/?key=17485978-f8ab03508758e8c2c6e39e620&q='+ props.SearchQuery +'+flowers&image_type=photo')
            .then(response => response.json())
            .then(response => {
                //console.log(response.hits);
                setItemArray(response.hits)
            })
            
            .catch(() => console.log("it didn't work")
            );

    }, [props.SearchQuery]);
    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState, i: Number) => {
        console.log(el);
        //if (!el || !el.links) {
            //return;
        //}
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={4} lg={3} className="MediaGridCard">
                <MediaCard ImageUrl={el.toString()} Description={''} />
            </Grid>)
    })

    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid
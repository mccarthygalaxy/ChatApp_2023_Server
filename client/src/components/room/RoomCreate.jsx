import React, { useRef } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import FullButton from '../buttons/FullButton';
import { baseURL } from '../../environments';

function MovieCreate(props) {

    const titleRef = useRef();
    const genreRef = useRef();
    const ratingRef = useRef();
    const lengthRef = useRef();
    const releasedRef = useRef();

    let ratings = [null, "G", "PG", "PG-13", "NC-17", "R"];

    const yearRange = () => {
        let years = [null]
        const thisYear = new Date().getFullYear();

        for (let i = thisYear; i >= 1892; i--) years.push(i);

        return (
            <>
                <Input innerRef={releasedRef} type='select'>
                    {
                        years.map((year, index) => {
                            return <option key={index} value={year}>{year}</option>
                        })
                    }
                </Input>
            </>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const genre = genreRef.current.value;
        const rating = ratingRef.current.value;
        const length = lengthRef.current.value;
        const releaseYear = releasedRef.current.value;

        let body = JSON.stringify({
            title, genre, rating, length, releaseYear
        })

        let url = `${baseURL}/movies`;

        let headers = new Headers();
        headers.append(`Content-Type`, `application/json`);
        headers.append('Authorization', props.token)

        const requestOption = {
            headers: headers,
            body: body,
            method: 'POST'
        }

        try {
            const res = await fetch(url, requestOption);
            const data = await res.json();

            // console.log(data);
            props.fetchMovies();
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <h1>Add Room</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Title</Label>
                    <Input 
                        name='movieTitle'
                        innerRef={titleRef}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Genre</Label>
                    <Input
                        type='select'
                        innerRef={genreRef}
                        >
                        <option value={""}></option>
                        <option value={"Comedy"}>Comedy</option>
                        <option value={"Drama"}>Drama</option>
                        <option value={"Action"}>Action</option>
                        <option value={"Horror"}>Horror</option>
                        <option value={"Thriller"}>Thriller</option>
                        <option value={"Family"}>Family</option>
                        <option value={"Documentary"}>Documentary</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Rating</Label>
                    <Input 
                        innerRef={ratingRef}
                        type='select'
                    >
                        {ratings.map((r, i) => <option key={i} value={r}>{r}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Length in Minutes</Label>
                    <Input type='number' min={0} innerRef={lengthRef} />
                </FormGroup>
                <FormGroup>
                    <Label>Year Released</Label>
                    {yearRange()}
                </FormGroup>
                <FullButton>
                    <Button color='success'>Add Movie</Button>
                </FullButton>
            </Form>
        </>
    )
}

export default MovieCreate
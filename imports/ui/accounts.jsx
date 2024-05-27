import React, {useState} from 'react';
import {Container, Header, Button, Form, Message} from 'semantic-ui-react';
import {useTracker} from 'meteor/react-meteor-data';
import {Accounts} from 'meteor/accounts-base';

const AccountsPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username && password) {
            Accounts.createUser({username, password}, (error) => {
                if (error) {
                    alert(error.message);
                } else {
                    alert('User created successfully');
                }
            });
        }
    };

    if (!!Meteor.userId()) {
        return (
            <Container text>
                {`User id ${Meteor.userId()} is logged in.`}
            </Container>
        )
    }

    return (
        <Container text>
            <Header as="h2" textAlign="center">Sign Up</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Field>
                <Button primary type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default AccountsPage;

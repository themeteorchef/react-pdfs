import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertDocument } from '../../api/documents/methods.js';

const handleInsertDocument = () => {
  const title = document.querySelector('[name="title"]');
  const body = document.querySelector('[name="body"]');

  if (title.value.trim() !== '' && body.value.trim() !== '') {
    insertDocument.call({
      title: title.value,
      body: body.value,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        title.value = '';
        body.value = '';
        Bert.alert('Document added!', 'success');
      }
    });
  } else {
    Bert.alert('Both a title and body are required.', 'danger');
  }
};

export const AddDocument = () => (
  <form className="AddDocument" onSubmit={ handleInsertDocument }>
    <FormGroup>
      <FormControl
        name="title"
        type="text"
        placeholder="Type a document title and press enter..."
      />
    </FormGroup>
    <FormGroup>
      <FormControl
        name="body"
        componentClass="textarea"
        placeholder="What do you want to say?"
      />
    </FormGroup>
    <Button onClick={ handleInsertDocument } bsStyle="success">Add Document</Button>
  </form>
);

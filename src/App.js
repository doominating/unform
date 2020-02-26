import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import './App.css';

import Input from './components/Form/input';

// const initialData = {
//   email: 'afonso.amaro@gmail.com',
//   address: {
//     city: 'SJRP',
//   },
// };

function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O e-mail é obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'No mínimo 3 caracteres')
            .required('A cidade é obrigatória'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Afonso Amaro',
        email: 'afonso.amaro@gmail.com',
        address: {
          city: 'SJRP',
        },
      });
    }, 2000);
  }, []);

  return (
    <div className='App'>
      <h1>Hello world</h1>

      <Form
        ref={formRef}
        // initialData={initialData}
        onSubmit={handleSubmit}
      >
        <Input name='name' />
        <Input type='text' name='email' />
        <Input type='password' name='password' />

        <Scope path='address'>
          <Input name='street' />
          <Input name='city' />
        </Scope>

        <button type='submit'>Enviar</button>
      </Form>
    </div>
  );
}

export default App;

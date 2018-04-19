import React, { Component } from 'react';
import styled from 'styled-components';

/*
    [Must]機能としてのコンポーネントと、スタイルとしてのコンポーネントをしっかり区別する
*/

const Heights = {
  header: '40',
  contens: '100vh',
}

const Colors = {
  white: '#fafafa',
  gray: '#eee',
}

const DefaultContainer = styled.div`
    padding: 0 120px;
`;

const Input = styled.input`
  margin: 0;
  padding: 1rem;
  border:1px solid ${Colors.gray};
  background: ${Colors.white};
  height: 30px;
  line-height: 30px;
  width: 100%;
  box-sizing: border-box;
  font-size: .8rem;
`;

const Card = styled.div`
  padding: 10px;
  width: 240px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
`;

const InputForm = (props) => {
  const input = props.input? props.input: { firstName: "", lastName: "", born: "" };
  const Root = Card.extend`
      height: 480px;
  `;
  const Button = styled.button`
      box-shadow: 0 2px 5px 0 rgba(0,0,0,0.26);
      display: block;
      cursor: pointer;
      min-height: 36px;
      min-width: 88px;
      line-height: 36px;
      border-radius: 2px;
      box-sizing: border-box;
      padding: 0 6px;
      margin: 40px auto;
      text-transform: uppercase;
      background: transparent;
      color: currentColor;
      :hover {
        color: #999;
      }
}
  `;
  return (
    <Root>
      <Input name="first-name" placeholder="Type your first name." value={input.firstName} />
      <br /><br />
      <Input name="last-name" placeholder="Type your last name." value={input.lastName} />
      <br /><br />
      <Input name="born" placeholder="Type your born." value={input.born} />

      <Button>Submit</Button>
    </Root>
  );
}

const DataCard = (props) => {
  const { user } = props;
  const Root = Card.extend`
      height: 80px;
      color: #555;
      margin-bottom: 20px;
      line-height: 30px;
  `;
  const Name = styled.div`
  `;
  const Born = styled.div`
  `;
  return (
    <Root>
      <Name>Name : {user.first} {user.last}</Name>
      <Born>Born : {user.born}</Born>
    </Root>
  );
}

const DisplayDataCards = (props) => {
  const Root = styled.div`
      width: 760px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: flex-start;
  `;
  const users = !props.users
  ? props.users
  : [
      {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      },
      {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      },
    ];

// {TODO} mapが実行されない

  return (
    <Root>
      {users.map((v,i)=>{
        return (
          <DataCard
            key={i}
            user={v}
            />
        );
      })}
    </Root>
  );
}

export const Header = (props) => {
  const Root = DefaultContainer.extend`
      height: ${Heights.header}px;
      line-height: ${Heights.header}px;
      background: ${Colors.gray};
      position: fixed;
      width: 100%;
      box-sizing: border-box;
  `;
  return (
    <Root>Use Firestore</Root>
  );
}

export const Contents = (props) => {
  const Root = DefaultContainer.extend`
      height: ${Heights.contens};
      background: ${Colors.white}
      padding-top: ${Heights.header*2}px;
      box-sizing: border-box;
  `;
  const ContentsWrapper = styled.div`
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
  `;
  return (
    <Root>
      This is Contents
      <ContentsWrapper>
        <InputForm />
        <DisplayDataCards
          users={props.users}
          input={props.input}
          />
      </ContentsWrapper>
    </Root>
  );
}

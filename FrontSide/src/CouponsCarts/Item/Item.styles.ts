import styled from 'styled-components';
/*עיצוב קופסאות המוצרים */ /*עיצוב התמונה שבתוך הדיב  */
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 90%;
  border: 2px solid lightblue;
  border-radius: 20px;
  height: 100%;
  button {
    border-radius: 0 0 20px 20px;
    background-color:white;
  }
  img {
    max-height: 250px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
    border: 1px solid red;
  }
  div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
    background-color:cyan;
    
  }
`;/*background-color:yellow; */
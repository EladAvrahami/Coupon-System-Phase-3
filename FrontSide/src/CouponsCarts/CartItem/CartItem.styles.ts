import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  .deleteIcon {
    font-size:2em;
    color:#e60000;
  }
  .priceContainer {
    font-size:1em;
    align:center;
    
    text-align: center;
  
  }
  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 5px;
  }
`;
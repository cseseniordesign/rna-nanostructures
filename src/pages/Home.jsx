import React from 'react';
import styled from "styled-components";
import "./Home.css";
import swoop from "../graphics/HomeSwoop.svg";
import login from "../graphics/LogInButton.svg";
import register from "../graphics/RegisterButton.svg";

function Home() {

    return (
    <div className="container-center-horizontal">
      <div className="desktop-web-home screen">
          <div className="main-text" margin="auto">
            <Title>RNAMake</Title>
            <X3DDesignToolkit>3D Design Toolkit</X3DDesignToolkit>
            <Text24>RNAMake is a toolkit for designing and optimizing RNA 3D structure. It allows the alignment between RNA motifs.
               These motif are small modular pieces of RNA that are believed to fold independently, thus attaching them together 
               with helix flanking both sides allows users of RNAMake to build large segments of RNA with a high success rate of 
               forming the predicted structure in vitro.<br /> <br />Create an account or log in to access the application</Text24>
          </div>
          <div>
            <LogInButton src={login} />
            <RegisterButton src={register} />
          </div>
          
      </div>
      <Swoop src={swoop} />
    </div>
    );
}

const LogInButton = styled.img`
  position: absolute;
  width: 233px;
  height: 67px;
  top: 650px;
  left: 176px;
`;

const RegisterButton = styled.img`
  position: absolute;
  width: 233px;
  height: 67px;
  top: 650px;
  left: 467px;
`;

const Swoop = styled.img`
  position: absolute;
  width: 100%;
  height: 920px;
  top: 0px;
  left: 0;
  z-index: -1;
`;

const Title = styled.h1`
  font-family: 'Chivo';
  font-size: 64px;
  position: absolute;
  color: #4C5F94;
  width: 574px;
  top: 120px;
  left: 15%;
  text-align: center;
  letter-spacing: 0;
`;

const X3DDesignToolkit = styled.div`
    font-family: 'Chivo';
    font-size: 24px;
    position: absolute;
    font-weight: bold;
    width: 292px;
    top: 225px;
    left: 25%;
    text-align: center;
    letter-spacing: 0;
`;

const Text24 = styled.div`
    font-family: 'Chivo';
    position: absolute;
    width: 700px;
    top: 320px;
    left: 12.5%;
    font-weight: 400;
    color: var(--black);
    font-size: var(--font-size-m);
    text-align: justify;
    letter-spacing: 0;
    text-indent: 50px;
`;

export default Home;

import React from "react";
import styled from "styled-components";
import "./Contact.css";
import helix from "../graphics/helix.svg";
import hongfeng from "../images/hongfeng.png";
import weitzel from "../images/weitzel.png";
import yesselman from "../images/yesselman.png";
import corner_swoosh from "../graphics/corner_swoosh.svg";

function Contact() {

  return (
    <div className="container-center-horizontal">
      <div className="desktop-contact screen">
        <OverlapGroup4>
          <Contacts>Contacts</Contacts>
          <Group12 src={helix} />
        </OverlapGroup4>
        <Text3>Eos aut doloremque fugit iste officia sed quisquam delectus. Voluptatem quaerat consequatur 
          voluptatem corporis et aspernatur nam. Qui est corrupti quibusdam explicabo recusandae.
           Quo dolor ea quos doloribus corrupti vero. Dignissimos molestiae explicabo totam non neque. 
           Eum velit amet perferendis sed ipsa doloremque.</Text3>
        <OverlapGroup5>
          <Image2 src={weitzel} />
          <Image3 src={hongfeng} />
          <OverlapGroup3>
            <Group14>
              <OverlapGroup>
                <Name>Derek Weitzel</Name>
                <Text4>Research Assistant Professor of Computer Science and Engineering</Text4>
              </OverlapGroup>
              <a href="mailto:dweitzel@unl.edu" target="_blank" rel="noreferrer">
                <Dweitzelunledu>dweitzel@unl.edu</Dweitzelunledu>
              </a>
            </Group14>
            <Group15>
              <OverlapGroup>
                <Name>Hongfeng Yu</Name>
                <Text4>Associate Professor of Computer Science and Engineering</Text4>
              </OverlapGroup>
              <a href="mailto:hfyu@unl.edu" target="_blank" rel="noreferrer">
                <Dweitzelunledu>hfyu@unl.edu</Dweitzelunledu>
              </a>
            </Group15>
            <Group13>
              <Image1 src={yesselman} />
              <OverlapGroup2>
                <Name>Joseph Yesselman</Name>
                <Text4>Assistant Professor of Chemistry</Text4>
              </OverlapGroup2>
              <Text6>
                <a href="mailto:jyesselm@unl.edu" target="_blank" rel="noreferrer">
                  <span className="chivo-normal-charade-18px">jyesselm@unl.edu</span>
                </a>
                <br />
                <span className="chivo-normal-charade-18px">Yesselman Lab Page</span>
              </Text6>
            </Group13>
          </OverlapGroup3>
        </OverlapGroup5>
        <Vector1 src={corner_swoosh} />
      </div>
    </div>
  );
}

const OverlapGroup4 = styled.div`
  width: 376px;
  height: 138px;
  position: relative;
  margin-top: 13px;
  margin-right: 44.19px;
`;

const Contacts = styled.div`
  font-family: 'Chivo';
  font-size: 48px;
  position: absolute;
  top: 45px;
  left: 108px;
  text-align: center;
  letter-spacing: 0;
  color: #4C5F94;
`;

const Group12 = styled.img`
  position: absolute;
  width: 121px;
  height: 138px;
  top: 0;
  left: 0;
`;

const Text3 = styled.div`
  font-family: 'Chivo';
  width: 732px;
  min-height: 121px;
  margin-top: 14px;
  text-align: center;
  letter-spacing: 0;
  color: #232C33;
`;

const OverlapGroup5 = styled.div`
  width: 1440px;
  height: 683px;
  position: relative;
  margin-top: 94px;
  margin-left: 8px;
`;

const Image2 = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0;
  left: 616px;
  object-fit: cover;
`;

const Image3 = styled.img`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0;
  left: 1037px;
  object-fit: cover;
`;

const OverlapGroup3 = styled.div`
  position: absolute;
  width: 1440px;
  height: 683px;
  top: 0;
  left: 0;
`;

const Group14 = styled.div`
  position: absolute;
  width: 295px;
  top: 224px;
  left: 571px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 160px;
`;

const OverlapGroup = styled.div`
  width: 289px;
  height: 93px;
  position: relative;
`;

const Name = styled.div`
  font-family: 'Chivo';
  position: absolute;
  width: 289px;
  top: 0;
  left: 0;
  text-align: center;
  letter-spacing: 0;
`;

const Text4 = styled.div`
  font-family: 'Chivo';
  position: absolute;
  width: 240px;
  top: 30px;
  left: 9px;
  text-align: center;
  letter-spacing: 0;
`;

const Dweitzelunledu = styled.div`
  font-family: 'Chivo';
  width: 289px;
  min-height: 47px;
  margin-top: 20px;
  text-align: center;
  letter-spacing: 0;
  text-decoration: underline;
  cursor: pointer;
`;

const Group15 = styled.div`
  position: absolute;
  width: 295px;
  top: 224px;
  left: 992px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 160px;
`;

const Group13 = styled.div`
  position: absolute;
  width: 295px;
  top: 0;
  left: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 363px;
`;

const Image1 = styled.img`
  width: 200px;
  height: 200px;
  margin-right: 5px;
  object-fit: cover;
`;

const OverlapGroup2 = styled.div`
  width: 289px;
  height: 51px;
  position: relative;
  margin-top: 24px;
  margin-right: 6px;
`;


const Text6 = styled.div`
  font-family: 'Chivo';
  width: 289px;
  min-height: 47px;
  margin-top: 41px;
  margin-right: 6px;
  text-align: center;
  letter-spacing: 0;
  text-decoration: underline;
`;

const Vector1 = styled.img`
  position: absolute;
  width: 100%;
  height: 408px;
  top: 600px;
  left: 0;
  z-index: -1;
`;

export default Contact;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { generateMerkleProof } from "../whitelist/merkle-tree";
import * as s from "../styles/globalStyles";
import styled from "styled-components";
import { ethers } from "ethers";

import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 7px;
  border: none;
  background-color: #52a3cc;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 180px;
  height: 40px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 7%;
  border: none;
  background-color: #e0f9fd;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  // box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.9);
  // border: 4px dashed var(--secondary);
  background-color: var(--accent);
  // border-radius: 100%;
  width: 500px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

const ModalDiv = styled.div`
  background-color: white;
  top: 50%;
  left: 50%;
  width: 300px;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border-radius: 3%;
  position: absolute;
`;

const WalletTypeSection = styled.div`
  margin-top: 10px;
  padding: 5px;
  display: flex;
  height: 150px;
  flex-direction: column;
  align-items: center;

  &:hover {
    background-color: #ece7e7;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const WalletLogo = styled.img`
  width: 100px;
`;

const WalletName = styled.h3`
  font-size: 1.25rem;
`;

const CloseModalBtn = styled.button`
  border: none;
  color: #fff;
  background-color: red;
  border-radius: 20%;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Header = (props) => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [mintAmount, setMintAmount] = useState(1);
  // this modal is used for user to choose a type of wallet, metamask or walletconnect
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [numberOfMinted, setNumberOfMinted] = useState();
  const [totalNumberOfNfts, setTotalNumberOfNfts] = useState(0);
  const [publicMintActive, setPublicMintActive] = useState(false);
  const [whiteListActive, setWhiteListActive] = useState(false);
  const [userWhiteListed, setUserWhiteListed] = useState(false);
  const [balanceof, setBalanceOf] = useState(0);
  const [buttonText, setButtonText] = useState("Wait");
  const [mintButtonDisabled, setMintButtonDisabled] = useState(true);
  // check if user minted max mint amount allowed
  const [maxMintAmountReached, setMaxMintAmountReached] = useState(false);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const [showsucstate, setShowsucstate] = useState({
    sopen: false,
    vertical: "top",
    horizontal: "right",
  });

  const [showerrstate, setShowerrstate] = useState({
    eopen: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal, sopen } = showsucstate;
  const { eopen } = showerrstate;

  // const [open, setOpen] = React.useState(false);

  const suchandleClick = (newShowstate) => {
    setShowsucstate({ sopen: true, ...newShowstate });
  };

  const suchandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowsucstate({ ...showsucstate, sopen: false });
  };

  const errhandleClick = (newShowstate) => {
    setShowerrstate({ eopen: true, ...newShowstate });
  };

  const errhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowerrstate({ ...showerrstate, eopen: false });
  };

  const claimNFTs = async () => {
    setMintButtonDisabled(true);
    const cost = await blockchain.smartContract.methods.cost().call();
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}`);
    setClaimingNft(true);

    if (whiteListActive) {
      // for whiteList mint
      const merkleProof = generateMerkleProof(blockchain.account);

      blockchain.smartContract.methods
        .whitelistMint(mintAmount, merkleProof)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .then(async (receipt) => {
          console.log(receipt);
          setFeedback(`Finished, Go visit Opensea.io to view it`);
          setClaimingNft(false);
          dispatch(fetchData(blockchain.account));
          suchandleClick({
            vertical: "top",
            horizontal: "right",
          });
          // alert(`The ${CONFIG.NFT_NAME} is yours!`);
          await checkIsMaxMintAllowancePassed();
          getData();
        })
        .catch((err) => {
          console.log(err);
          setFeedback("Something Wrong");
          setClaimingNft(false);
          errhandleClick({
            vertical: "top",
            horizontal: "right",
          });
          setMintButtonDisabled(false);
        });
    } else {
      blockchain.smartContract.methods
        .mint(mintAmount)
        .send({
          gasLimit: String(totalGasLimit),
          to: CONFIG.CONTRACT_ADDRESS,
          from: blockchain.account,
          value: totalCostWei,
        })
        .then(async (receipt) => {
          console.log(receipt);
          setFeedback(`Finished,Go visit Opensea.io to view it.`);
          setClaimingNft(false);
          dispatch(fetchData(blockchain.account));
          suchandleClick({
            vertical: "top",
            horizontal: "right",
          });
          getData();
        })
        .catch((err) => {
          console.log(err);
          errhandleClick({
            vertical: "top",
            horizontal: "right",
          });
          setFeedback("Something Wrong");
          setClaimingNft(false);
          setMintButtonDisabled(false);
        });
    }
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount <= 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = async () => {
    let newMintAmount = mintAmount + 1;
    if (whiteListActive) {
      const maxNumberOfNftsPerUser = await blockchain.smartContract.methods
        .capWhitelist()
        .call({
          from: blockchain.account,
        });
      const nftsMintedByUser = await blockchain.smartContract.methods
        .walletOfOwner(blockchain.account)
        .call({
          from: blockchain.account,
        });
      if (newMintAmount >= maxNumberOfNftsPerUser - nftsMintedByUser.length) {
        newMintAmount = maxNumberOfNftsPerUser - nftsMintedByUser.length; //whitelist button max
      }
    } else {
      const maxNumberOfNftsPerUser = await blockchain.smartContract.methods
        .capPublic()
        .call({
          from: blockchain.account,
        });
      const nftsMintedByUser = await blockchain.smartContract.methods
        .walletOfOwner(blockchain.account)
        .call({
          from: blockchain.account,
        });
      if (newMintAmount >= maxNumberOfNftsPerUser - nftsMintedByUser.length) {
        newMintAmount = maxNumberOfNftsPerUser - nftsMintedByUser.length; //publicmint button max
      }
    }
    setMintAmount(newMintAmount);
  };

  const getData = async () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));

      blockchain.smartContract.methods
        .totalSupply()
        .call()
        .then((result) => setNumberOfMinted(result));

      blockchain.smartContract.methods
        .maxSupply()
        .call()
        .then((result) => setTotalNumberOfNfts(result));

      const bc = await blockchain.smartContract.methods
        .balanceOf(blockchain.account)
        .call();
      // .then((result) => setBalanceOf(result));

      const cost = await blockchain.smartContract.methods.cost().call();

      const needcost = ethers.utils.formatEther(cost);

      // check if user is whitelisted

      const whiteListActive = await blockchain.smartContract.methods
        .whitelistMintEnabled()
        .call();

      const publicMintActive = await blockchain.smartContract.methods
        .publicMintEnabled()
        .call();
      //check public close
      const hasContractChanged = await blockchain.smartContract.methods
        .hasContractChanged()
        .call();

      console.log(`Has contract ${hasContractChanged}`);

      // check whitlist close
      const finishedwhitelistEnabled = await blockchain.smartContract.methods
        .finishedwhitelistEnabled()
        .call();

      console.log(`finishedwhitelist ${finishedwhitelistEnabled}`);

      setWhiteListActive(whiteListActive);
      setPublicMintActive(publicMintActive);
      setBalanceOf(bc);
      setFeedback(`1GFC = ${needcost} ETH`);

      // This would be usual flow of mint stages:
      //if whitelist active, verified user can mint, unverified can't
      // if public mint is active, and whitelist is not, user can buy
      // check if both are closed, that means whitelist is closed first then public second
      // which means everything is sold out
      // if only whitelist isn't active that means that whitelist is over and we'are waiting for public mint
      if (whiteListActive) {
        try {
          const merkleProof = generateMerkleProof(blockchain.account);
          await blockchain.smartContract.methods
            .verifyMerkle(merkleProof)
            .call({
              from: blockchain.account,
            });

          if (await checkIsMaxMintAllowancePassed()) {
            setButtonText("WHITELIST MINT");
            setMintButtonDisabled(false);
            setUserWhiteListed(true);
          } else {
            setButtonText("ALREADY MINTED");
            setMintButtonDisabled(true);
          }
        } catch (err) {
          // if error is thrown, it means user is not whitelisted
          console.log(err);
          setButtonText("NOT WHITELISTED");
          setMintButtonDisabled(true);
        }
      } else if (!whiteListActive && finishedwhitelistEnabled) {
        setButtonText("READY FOR PUBLIC");
        setMintButtonDisabled(true);
        if (publicMintActive) {
          if (await checkIsMaxMintAllowancePassed()) {
            setButtonText("PUBLIC MINT");
            setMintButtonDisabled(false);
          } else {
            setButtonText("ALREADY MINTED");
            setMintButtonDisabled(true);
          }
        } else if (!publicMintActive && hasContractChanged) {
          setButtonText("SOLD OUT");
          setMintButtonDisabled(true);
        }
      } else if (publicMintActive) {
        if (await checkIsMaxMintAllowancePassed()) {
          setButtonText("PUBLIC MINT");
          setMintButtonDisabled(false);
        } else {
          setButtonText("ALREADY MINTED");
          setMintButtonDisabled(true);
        }
      } else if (!publicMintActive && hasContractChanged) {
        setButtonText("SOLD OUT");
        setMintButtonDisabled(true);
      }
    }
  };

  // check if user has minted all his entries
  async function checkIsMaxMintAllowancePassed() {
    let maxNumberOfNftsPerUser = 0;
    const whiteListActive = await blockchain.smartContract.methods
      .whitelistMintEnabled()
      .call();
    setWhiteListActive(whiteListActive);
    if (whiteListActive) {
      maxNumberOfNftsPerUser = await blockchain.smartContract.methods
        .capWhitelist()
        .call({
          from: blockchain.account,
        });
    } else {
      maxNumberOfNftsPerUser = await blockchain.smartContract.methods
        .capPublic()
        .call({
          from: blockchain.account,
        });
    }
    const nftsMintedByUser = await blockchain.smartContract.methods
      .walletOfOwner(blockchain.account)
      .call({
        from: blockchain.account,
      });

    console.log(nftsMintedByUser.length, maxNumberOfNftsPerUser);
    if (nftsMintedByUser.length >= maxNumberOfNftsPerUser) {
      setUserWhiteListed(false);
      setMaxMintAmountReached(true);
      return false;
    }

    return true;
  }

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  // for changing modal visibility
  function openModal() {
    setWalletModalOpen(true);
  }

  function closeModal() {
    setWalletModalOpen(false);
  }

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <img
            src="img/projpic/headback.png"
            className="overlaybackground"
            alt="pic"
          ></img>
          <div className="container">
            <div className="row">
              <ResponsiveWrapper
                flex={1}
                style={{ padding: 24, marginTop: 20 }}
              >
                <s.SpacerLarge />
                <s.Container
                  flex={2}
                  jc={"center"}
                  ai={"center"}
                  style={{
                    // backgroundColor: "var(--accent)",
                    padding: 24,
                    borderRadius: 24,
                    // border: "4px dashed var(--secondary)",
                    // boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                    height: 500,
                    // width: 1200,
                    // marginTop: 20,
                  }}
                >
                  <s.TextTitle
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)",
                      marginBottom: 30,
                      fontSize: 60,
                      // border: "4px solid white",
                      borderRadius: 100,
                    }}
                  >
                    Minted
                  </s.TextTitle>
                  {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                    <div></div>
                  ) : (
                    <>
                      <s.TextTitle
                        style={{
                          textAlign: "center",
                          fontSize: 50,
                          fontWeight: "bold",
                          color: "var(--accent-text)",
                        }}
                      >
                        {/* {data.totalSupply} / {CONFIG.MAX_SUPPLY} */}
                        {data.totalSupply} / {data.maxSupply}
                      </s.TextTitle>
                    </>
                  )}

                  <s.TextDescription
                    style={{
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {blockchain.account > 0 ? (
                      "Connected: " +
                      String(blockchain.account).substring(0, 6) +
                      "..." +
                      String(blockchain.account).substring(38)
                    ) : (
                      <span></span>
                    )}

                    {/* {
											totalNumberOfNfts && <span style={{ color: '#000' }}>{numberOfMinted}/{totalNumberOfNfts}</span>
										} */}

                    {/*                   
                  <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                   {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                   </StyledLink>
                  */}
                  </s.TextDescription>
                  <s.SpacerSmall />
                  {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                    <>
                      <s.TextTitle
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {/* The sale has ended. */}
                      </s.TextTitle>
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {/* You can still find {CONFIG.NFT_NAME} on */}
                      </s.TextDescription>
                      <s.SpacerSmall />
                      <StyledLink
                        target={"_blank"}
                        href={CONFIG.MARKETPLACE_LINK}
                      >
                        {CONFIG.MARKETPLACE}
                      </StyledLink>
                    </>
                  ) : (
                    <>
                      <s.TextTitle
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {/* 1 NFT = {CONFIG.DISPLAY_COST}{" "}
                        {CONFIG.NETWORK.SYMBOL} */}
                      </s.TextTitle>
                      <s.SpacerXSmall />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {/* Excluding gas fees. */}
                      </s.TextDescription>
                      <s.SpacerSmall />
                      {blockchain.account === "" ||
                      blockchain.smartContract === null ? (
                        <s.Container ai={"center"} jc={"center"}>
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            Connect to the {CONFIG.NETWORK.NAME} network
                          </s.TextDescription>
                          <s.SpacerSmall />
                          <StyledButton
                            onClick={(e) => {
                              e.preventDefault();
                              openModal();
                              // these actions are done after user chooses wallet type
                              //   dispatch(connect());
                              //   getData();
                            }}
                          >
                            CONNECT TO WALLET
                          </StyledButton>
                          <ModalDiv
                            style={{
                              display: `${walletModalOpen ? "flex" : "none"}`,
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <h2
                                style={{
                                  marginRight: "20px",
                                  fontSize: "2rem",
                                }}
                              ></h2>
                              <CloseModalBtn onClick={closeModal}>
                                &#10005;
                              </CloseModalBtn>
                            </div>
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <WalletTypeSection
                                onClick={() => {
                                  dispatch(connect("metamask"));
                                  getData();
                                  closeModal();
                                }}
                              >
                                <WalletLogo
                                  src="./config/images/metamask-logo.png"
                                  alt="metamask"
                                />
                                <WalletName>MetaMask</WalletName>
                                <p style={{ color: "#000" }}></p>
                              </WalletTypeSection>
                              <WalletTypeSection
                                onClick={() => {
                                  dispatch(connect("walletconnect"));
                                  getData();
                                  closeModal();
                                }}
                              >
                                <WalletLogo
                                  src="./config/images/walletconnect-logo.jfif"
                                  alt="walletconnect"
                                />
                                <WalletName>WalletConnect</WalletName>
                                <p style={{ color: "#000" }}></p>
                              </WalletTypeSection>
                            </div>
                          </ModalDiv>
                          {blockchain.errorMsg !== "" ? (
                            <>
                              <s.SpacerSmall />
                              <s.TextDescription
                                style={{
                                  textAlign: "center",
                                  color: "var(--accent-text)",
                                }}
                              >
                                {blockchain.errorMsg}
                              </s.TextDescription>
                            </>
                          ) : null}
                        </s.Container>
                      ) : (
                        <>
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {feedback}
                          </s.TextDescription>
                          <s.SpacerMedium />
                          <s.Containerselect
                            ai={"center"}
                            jc={"center"}
                            fd={"row"}
                            style={{
                              display: `${
                                (whiteListActive && userWhiteListed) ||
                                (publicMintActive && !maxMintAmountReached)
                                  ? "flex"
                                  : "none"
                              }`,
                            }}
                          >
                            <StyledRoundButton
                              style={{ lineHeight: 0.4 }}
                              // disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                decrementMintAmount();
                              }}
                            >
                              -
                            </StyledRoundButton>
                            {/* <s.SpacerMedium /> */}
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {mintAmount}
                            </s.TextDescription>
                            {/* <s.SpacerMedium /> */}
                            {/* <p style={{ color: 'black' }}>Amount: {mintAmount}</p> */}
                            <StyledRoundButton
                              // disabled={claimingNft ? 1 : 0}
                              onClick={(e) => {
                                e.preventDefault();
                                incrementMintAmount();
                              }}
                            >
                              +
                            </StyledRoundButton>
                          </s.Containerselect>
                          <s.SpacerSmall />

                          <StyledButton
                            style={{
                              display: `${
                                totalNumberOfNfts ? "inline-block" : "none"
                              }`,
                            }}
                            disabled={mintButtonDisabled}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                            }}
                          >
                            {claimingNft ? "BUSY" : buttonText}
                          </StyledButton>
                          <s.SpacerLarge />
                          <s.TextTitle
                            style={{
                              textAlign: "center",
                              fontSize: 20,
                              fontWeight: "bold",
                              color: "var(--accent-text)",
                            }}
                          >
                            YOU HAVE MINTED : {balanceof}
                          </s.TextTitle>

                          {/* <Button
                            variant="outlined"
                            onClick={() =>
                              suchandleClick({
                                vertical: "top",
                                horizontal: "right",
                              })
                            }
                          >
                            Open success snackbar
                          </Button> */}
                          <Snackbar
                            open={sopen}
                            autoHideDuration={6000}
                            onClose={suchandleClose}
                            anchorOrigin={{ vertical, horizontal }}
                            // key={vertical + horizontal}
                            sx={{
                              marginTop: 10,
                              backgroundColor: "#6908b3",
                            }}
                          >
                            <Alert
                              onClose={suchandleClose}
                              severity="success"
                              sx={{ width: "100%", backgroundColor: "#6908b3" }}
                            >
                              <strong> The {CONFIG.NFT_NAME} is yours!</strong>
                            </Alert>
                          </Snackbar>

                          {/* <Button
                            variant="outlined"
                            onClick={() =>
                              errhandleClick({
                                vertical: "top",
                                horizontal: "right",
                              })
                            }
                          >
                            Open success snackbar
                          </Button> */}
                          <Snackbar
                            open={eopen}
                            autoHideDuration={6000}
                            onClose={errhandleClose}
                            anchorOrigin={{ vertical, horizontal }}
                            // key={vertical + horizontal}
                            sx={{
                              marginTop: 10,
                              // backgroundColor: "#6908b3",
                            }}
                          >
                            <Alert
                              onClose={errhandleClose}
                              severity="error"
                              sx={{ width: "100%" }}
                            >
                              <strong>There's a problem</strong>
                            </Alert>
                          </Snackbar>
                        </>
                      )}
                    </>
                  )}
                  <s.SpacerMedium />
                </s.Container>
                <s.SpacerLarge />
              </ResponsiveWrapper>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

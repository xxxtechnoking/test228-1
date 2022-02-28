// SPDX-License-Identifier: MIT
// GEEK FANCY CLUB

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GEEKFANCYCLUB is ERC721, Ownable, ReentrancyGuard {

  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private supply;

  bytes32 public merkleRoot;
  mapping(address => uint256) public whitelistMintedBalance;
  mapping(address => bool) public freeMintClaimed;
  mapping(address => uint256) public publicMintedBalance;

  // check if publict was turned on
  bool public hasContractChanged = false;
  bool public finishedwhitelistEnabled =false;


  string public uriPrefix = "";//this is baseuri
  string public uriSuffix = ".json";
  string public hiddenMetadataUri;
  
  uint256 public cost;
  uint256 public maxSupply;
  uint256 public capWhitelist;
  uint256 public capPublic;
  uint256 public maxReserve;

  bool public whitelistMintEnabled = false;
  bool public publicMintEnabled = false;
  bool public revealed = false;
  bool public freeMintEnabled = false;

  constructor(
    uint256 _cost,
    uint256 _maxSupply,
    uint256 _capWhitelist,
    uint256 _capPublic,
    uint256 _maxReserve,
    string memory _hiddenMetadataUri
  ) 
    ERC721("tokenname", "dddd") {
    cost = _cost;//*10^18=_ether
    maxSupply = _maxSupply;
    capWhitelist = _capWhitelist;
    capPublic = _capPublic;
    maxReserve = _maxReserve;
    setHiddenMetadataUri(_hiddenMetadataUri);
   
  }
//////////////////////////////////////////////////////////////////////////////////////////////
  modifier mintCompliance(uint256 _mintAmount) {
    require(supply.current() + _mintAmount <= (maxSupply - maxReserve), "Sold out");
    _;
  }

  modifier mintPriceCompliance(uint256 _mintAmount) {
    require(msg.value >= cost * _mintAmount, "Insufficient funds!");
    _;
  }

  function totalSupply() public view returns (uint256) {
    return supply.current();
  }
/// whitelistmint & publicmint //////////////////////////////////////////////////////////////////////////////////////////
  
  function whitelistMint(uint256 _mintAmount, bytes32[] calldata _merkleProof) public payable 
    mintCompliance(_mintAmount) 
    mintPriceCompliance(_mintAmount) { 
    require(whitelistMintEnabled, "Not Ready");
    require(_mintAmount > 0 && whitelistMintedBalance[msg.sender] + _mintAmount <= capWhitelist,"Amount Limit");
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Not Whitelist");
    
    _mintLoop(msg.sender, _mintAmount);
    whitelistMintedBalance[msg.sender] += _mintAmount;
  }

  
  function mint(uint256 _mintAmount) public payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    require(publicMintEnabled, "Not Ready");
    require(_mintAmount > 0 && publicMintedBalance[msg.sender] + _mintAmount <= capPublic,"Amount Limit");

    _mintLoop(msg.sender, _mintAmount);
    publicMintedBalance[msg.sender] += _mintAmount;
  }
 


 // For marketing etc////////////////////////////////////////
  
  function freeMint(uint256 _mintAmount, bytes32[] calldata _merkleProof) public payable 
    mintCompliance(_mintAmount) 
    { 
    require(freeMintEnabled, "Not Ready");
    require(!freeMintClaimed[msg.sender], "Address already claimed!");
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Not freemint address");
    
    _mintLoop(msg.sender, 1);//One FreeMintAddress only can mint 1 nft
    freeMintClaimed[msg.sender] = true;
  }
 

  function ReserveforAddress (uint256 _mintAmount, address _receiver) public onlyOwner {
    require(_mintAmount <= maxReserve,
            "Max Reserve amount exceeded");
     
    _mintLoop(_receiver, _mintAmount);
     maxReserve -= _mintAmount;

    
  }
  

/////////////////////////////////////////////////////////
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = 1;
    uint256 ownedTokenIndex = 0;
    while (ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply) {
      address currentTokenOwner = ownerOf(currentTokenId);
      if (currentTokenOwner == _owner) {
        ownedTokenIds[ownedTokenIndex] = currentTokenId;
        ownedTokenIndex++;
      }
      currentTokenId++;
    }
    return ownedTokenIds;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      "Nonexistent token"
    );
    if (revealed == false) {
      return hiddenMetadataUri;
    }
    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), uriSuffix))
        : "";
  }
//// only owner////////////////////////////////////////////////////////////////////////////////////
  function setRevealed(bool _state) public onlyOwner {
    revealed = _state;
  }

  function setCost(uint256 _cost) public onlyOwner {
    cost = _cost;
  }

  function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
    merkleRoot = _merkleRoot;
  }

  function verifyMerkle(bytes32[] calldata _merkleProof) public view {
    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Invalid proof!");
  }

  function setcapWhitelist(uint256 _capWhitelist) public onlyOwner {
    capWhitelist = _capWhitelist;
  }

  function setcapPubliclist(uint256 _capPublic) public onlyOwner {
    capPublic = _capPublic;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner {
    hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriPrefix(string memory _uriPrefix) public onlyOwner {
    uriPrefix = _uriPrefix;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    uriSuffix = _uriSuffix;
  }
 
  function setpublicMintEnabled(bool _state) public onlyOwner {
    if(publicMintEnabled == true && _state == false) {
      hasContractChanged = true;
    }
    publicMintEnabled = _state;
  }

  function setWhitelistMintEnabled(bool _state) public onlyOwner {
      if(whitelistMintEnabled == true && _state == false) {
      finishedwhitelistEnabled = true;
    }
    
    whitelistMintEnabled = _state;
  }

  function setfreeMintEnabled(bool _state) public onlyOwner {
    freeMintEnabled = _state;
  }

  function withdraw() public onlyOwner nonReentrant {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

  function _mintLoop(address _receiver, uint256 _mintAmount) internal {
    for (uint256 i = 0; i < _mintAmount; i++) {
      supply.increment();
      _safeMint(_receiver, supply.current());
    }
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }
}

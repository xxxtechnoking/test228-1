const { ethers } = require('ethers');
const keccak256 = require('keccak256');
const { MerkleTree } = require('merkletreejs');
const addresses = require('./addresses.json');

function hashAccount(userAddress) {
    return Buffer.from(
        ethers.utils.solidityKeccak256(
            ['address'], [userAddress]
        ).slice(2),
        'hex'
    )
}

function generateMerkleTree(addresses) {
    const merkleTree = new MerkleTree(
        addresses.map(hashAccount),
        keccak256, { sortPairs: true }
    )

    return merkleTree;
}

export function generateMerkleProof(userAddress) {
    const merkleTree = generateMerkleTree(addresses);
    const proof = merkleTree.getHexProof(
        hashAccount(userAddress)
    );

    return proof;
}

// const finalMerkleTree = generateMerkleTree(addresses);
// console.log(finalMerkleTree.getHexRoot());



// 如果要root就把33～34解开，24～31注释掉
// root完记得返回成原来状态
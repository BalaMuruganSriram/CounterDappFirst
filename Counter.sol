// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Counter{
    uint256 private count;
    constructor(){
        count = 0;
    }
    function setCount(uint256 _count) public{
        count = _count;
    }
    function inc() public{
        count++;
    }
    function getCount() public view returns(uint256){
        return count;
    }
    function dec() public{
        count--;
    }

}

import { defaultAbiCoder } from '@ethersproject/abi'
import { getCreate2Address } from '@ethersproject/address'
import { keccak256 } from '@ethersproject/solidity'
import { Token,V3_CORE_FACTORY_ADDRESSES , ChainId} from '@uniswap/sdk-core'
import { FeeAmount, POOL_INIT_CODE_HASH } from '../constants'
import { utils as zkUtils } from 'zksync-web3'


function getMagmaPoolAddress({
  token0,
  token1,
  fee,
  factoryAddress
}:{
  token0:string,
  token1:string,
  fee:FeeAmount,
  factoryAddress:string
}){

  console.log("getMagmaPoolAddressgetMagmaPoolAddress")
  const data = keccak256(
    ['bytes'],
    [defaultAbiCoder.encode(['address', 'address', 'uint24'], [token0, token1, fee])]
  )
  return zkUtils.create2Address(factoryAddress, POOL_INIT_CODE_HASH, data, '0x')

}
/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride
}: {
  factoryAddress: string
  tokenA: Token
  tokenB: Token
  fee: FeeAmount
  initCodeHashManualOverride?: string
}): string {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks

  const magmaFactoryAddress = V3_CORE_FACTORY_ADDRESSES[ChainId.MAGMA_TESTNET]

  console.log("getMagmaPoolAddressgetMagmaPoolAddresspapap",magmaFactoryAddress === factoryAddress)

  if(magmaFactoryAddress === factoryAddress){
    return getMagmaPoolAddress({
      token0:token0.address,
      token1:token1.address,
      fee,
      factoryAddress,
    })
  }
  return getCreate2Address(
    factoryAddress,
    keccak256(
      ['bytes'],
      [defaultAbiCoder.encode(['address', 'address', 'uint24'], [token0.address, token1.address, fee])]
    ),
    initCodeHashManualOverride ?? POOL_INIT_CODE_HASH
  )
}

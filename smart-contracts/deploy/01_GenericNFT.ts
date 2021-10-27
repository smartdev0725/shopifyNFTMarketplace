import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const contractName = "GenericNFT";

const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
): Promise<void> => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  // Only for development stage
  if (+chainId !== 1) {
    await deploy(contractName, {
      contract: contractName,
      from: deployer,
      log: true,
      proxy: {
        proxyContract: "OpenZeppelinTransparentProxy",
        execute: {
          init: {
            methodName: "initialize",
            args: ["Generic token", "GEN"],
          }
        }
      },
    });
  }
};

export default func;
func.tags = [contractName];
func.id = contractName;
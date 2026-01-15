"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useChainId,
} from "wagmi";
import { injected } from "wagmi/connectors";

const CONTRACT_ADDRESS = "0x0fa18d500d7e2f896111fbd5e806ce36aba8eea0";
const FUJI_CHAIN_ID = 43113;

const SIMPLE_STORAGE_ABI = [
  {
    inputs: [],
    name: "getValue",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "_value", type: "uint256" }],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default function Page() {
  const { address, isConnected, chain } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [inputValue, setInputValue] = useState("");

  const {
    data: value,
    isLoading: isReading,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: "getValue",
  });

  // TASK 5: Menambahkan 'error' dan 'reset' untuk penanganan kegagalan
  const {
    writeContract,
    data: hash,
    error,
    isPending: isWriting,
    reset,
  } = useWriteContract();

  const handleSetValue = async () => {
    if (!inputValue) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: "setValue",
      args: [BigInt(inputValue)],
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 font-sans p-4">
      <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Avalanche dApp
          </h1>
          <p className="text-sm text-zinc-500 italic">
            Day 3 Framework Interaction
          </p>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Network Status
            </span>
            {isConnected ? (
              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                <div
                  className={`w-2 h-2 rounded-full ${
                    chainId === FUJI_CHAIN_ID
                      ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                      : "bg-red-500"
                  }`}
                ></div>
                <span className="text-xs font-semibold">
                  {chain?.name || "Unknown"}
                </span>
              </div>
            ) : (
              <span className="text-xs text-zinc-600">Disconnected</span>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Connected Wallet
            </span>
            {isConnected ? (
              <div className="flex flex-col gap-2">
                <p className="font-mono text-[11px] bg-black/40 p-3 rounded-lg border border-zinc-800 text-zinc-300 break-all leading-relaxed">
                  {address}
                </p>
                <button
                  onClick={() => disconnect()}
                  className="text-[10px] text-zinc-500 hover:text-red-400 transition-colors self-end uppercase font-bold tracking-tighter"
                >
                  [ Disconnect Wallet ]
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: injected() })}
                disabled={isConnecting}
                className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                {isConnecting ? "Opening Wallet..." : "Connect Wallet"}
              </button>
            )}
          </div>
        </div>

        {isConnected && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Stored Value
                </span>
                <button
                  onClick={() => refetch()}
                  className="text-[10px] text-blue-400 hover:underline"
                >
                  Refresh
                </button>
              </div>
              <div className="text-4xl font-light text-white tracking-tighter">
                {isReading ? (
                  <span className="text-zinc-700 animate-pulse">...</span>
                ) : (
                  value?.toString() || "0"
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Update Value
                </label>
                <input
                  type="number"
                  placeholder="Enter new number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                />
              </div>
              <button
                onClick={handleSetValue}
                disabled={isWriting || chainId !== FUJI_CHAIN_ID}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                  chainId !== FUJI_CHAIN_ID
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                }`}
              >
                {isWriting
                  ? "Processing Transaction..."
                  : chainId !== FUJI_CHAIN_ID
                  ? "Switch to Fuji Network"
                  : "Update Contract"}
              </button>

              {/* TASK 5: Feedback Kesalahan (Failure Handling) */}
              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-xl animate-in shake duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">
                      Transaction Failed
                    </span>
                    <button
                      onClick={() => reset()}
                      className="text-[10px] text-zinc-500 hover:text-zinc-300 italic"
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="text-[11px] text-red-300/80 leading-relaxed font-medium">
                    {error.message.includes("User rejected")
                      ? "Transaction was rejected in your wallet."
                      : "An error occurred or the transaction reverted."}
                  </p>
                </div>
              )}

              {/* Feedback Transaction Hash */}
              {hash && (
                <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl animate-in zoom-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                      Transaction Sent
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 italic">
                      Pending
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-400 break-all mb-3 opacity-70 leading-relaxed">
                    {hash}
                  </p>
                  <a
                    href={`https://testnet.snowtrace.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-400 hover:text-blue-300 underline flex items-center gap-1 font-bold"
                  >
                    VIEW ON SNOWTRACE ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="text-center pt-4">
          <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
            Avalanche Fuji Testnet • Chain ID 43113
          </p>
        </footer>
      </div>
    </main>
  );
}

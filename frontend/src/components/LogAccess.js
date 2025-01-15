import React, { useState } from "react";
import { groth16 } from "snarkjs"; // Use snarkjs to generate ZK proofs

const LogAccess = ({ auditLogContract, verifierContract }) => {
  const [fileId, setFileId] = useState("");
  const [action, setAction] = useState("");
  const [proof, setProof] = useState(null);

  const handleGenerateProof = async () => {
    try {
      const input = { fileId }; // Input for the ZK circuit
      const { proof, publicSignals } = await groth16.fullProve(input, "./compiled/file_access_js/file_access.wasm", "./compiled/file_access_final.zkey");

      setProof({ proof, publicSignals });
      alert("Proof generated successfully!");
    } catch (error) {
      console.error("Error generating proof:", error);
      alert("Failed to generate proof. Please try again.");
    }
  };

  const handleLogAccess = async () => {
    if (!proof) {
      alert("Please generate a proof first!");
      return;
    }

    try {
      const { proof, publicSignals } = proof;
      const proofA = [proof.pi_a[0], proof.pi_a[1]];
      const proofB = [
        [proof.pi_b[0][0], proof.pi_b[0][1]],
        [proof.pi_b[1][0], proof.pi_b[1][1]],
      ];
      const proofC = [proof.pi_c[0], proof.pi_c[1]];
      const pubSignals = publicSignals;

      const tx = await auditLogContract.addLog(
        window.ethereum.selectedAddress,
        fileId,
        action,
        proofA,
        proofB,
        proofC,
        pubSignals
      );
      await tx.wait();
      alert("Log added successfully!");
    } catch (error) {
      console.error("Error logging access:", error);
      alert("Failed to log access. Please try again.");
    }
  };

  return (
    <div className="log-file-access-container">
        <input
            type="text"
            placeholder="File ID"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            className="text-input"
        />
        <input
            type="text"
            placeholder="Action (e.g., Read)"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="text-input"
        />
        <div className="button-group">
            <button onClick={handleGenerateProof} className="action-button">
                Generate Proof
            </button>
            <button onClick={handleLogAccess} className="action-button">
                Log Access
            </button>
        </div>
    </div>
  );
};

export default LogAccess;

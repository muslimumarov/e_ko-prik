import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../core/hooks/apiUrl";
import { BridgeData } from "../../../core/interfaces/interfaces.ts";
import { motion } from "framer-motion";

const ArchiveDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [bridge, setBridge] = useState<BridgeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBridgeDetails = async () => {
      try {
        const response = await api.get(`/bridges/${id}`);
        setBridge(response.data);
      } catch (err) {
        setError("Failed to fetch bridge details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBridgeDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"
        />
      </div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-center text-red-500"
      >
        {error}
      </motion.div>
    );

  if (!bridge)
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="p-4 text-center"
      >
        Bridge not found
      </motion.div>
    );

  return (
    <div className="relative  min-h-screen">
      {/* Blurred background */}
      {bridge.images.length > 0 && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <img
            src={bridge.images[0].image}
            alt="Background"
            className="h-full w-full object-cover opacity-20 blur-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x200?text=Image+Not+Available";
            }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container  relative mx-auto h-auto px-4 py-6"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className=" relative top-24 mb-24 overflow-hidden  rounded-lg bg-white bg-opacity-90 shadow-xl backdrop-blur-sm"
        >
          {/* Header section */}
          <div className="border-b bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4">
            <motion.h1
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-800"
            >
              {bridge.name}
            </motion.h1>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <motion.span whileHover={{ scale: 1.05 }} className="mr-4">
                <span className="font-medium">Region:</span>{" "}
                {bridge.region?.name}
              </motion.span>
              <motion.span whileHover={{ scale: 1.05 }}>
                <span className="font-medium">District:</span>{" "}
                {bridge.district?.name}
              </motion.span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6">
            {/* Status and basic info */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  Basic Information
                </h2>
                <div className="space-y-2">
                  {[
                    { label: "Status", value: bridge.holat },
                    { label: "Orderer", value: bridge.buyrutmachi },
                    { label: "Project", value: bridge.loyiha },
                    { label: "Contractor", value: bridge.pudratchi },
                  ].map((item, index) => (
                    <motion.p
                      key={index}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <span className="font-medium">{item.label}:</span>{" "}
                      {item.value || "N/A"}
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* Location info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  Location
                </h2>
                {bridge.locations.length > 0 ? (
                  bridge.locations.map((location, index) => (
                    <motion.div
                      key={location.id}
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {location.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Coordinates:</span>{" "}
                        {location.latitude}, {location.longitude}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p>No location information available</p>
                )}
              </motion.div>
            </div>

            {/* Technical parameters */}
            {bridge.texnik_parametrlari && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  Technical Parameters
                </h2>
                <p className="whitespace-pre-line">
                  {bridge.texnik_parametrlari}
                </p>
              </motion.div>
            )}

            {/* Images gallery */}
            {bridge.images.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="mb-3 text-lg font-semibold text-gray-700">
                  Images
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {bridge.images.map((img, index) => (
                    <motion.div
                      key={img.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="overflow-hidden rounded-lg border shadow-md"
                    >
                      <img
                        src={img.image}
                        alt={`Bridge ${bridge.name}`}
                        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/300x200?text=Image+Not+Available";
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ArchiveDetail;

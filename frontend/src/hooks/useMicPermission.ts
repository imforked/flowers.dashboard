import { useEffect, useState } from "react";

type MicPermissionState = "granted" | "denied" | "prompt" | "unsupported";

export const useMicPermission = () => {
  const [permission, setPermission] = useState<MicPermissionState>("prompt");

  useEffect(() => {
    if (!navigator.permissions) {
      setPermission("unsupported");
      return;
    }

    navigator.permissions
      .query({ name: "microphone" as PermissionName })
      .then((status) => {
        setPermission(status.state);

        // Listen for changes (user updates browser settings)
        status.onchange = () => {
          setPermission(status.state);
        };
      });
  }, []);

  return permission;
};

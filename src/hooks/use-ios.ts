import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export function useIOS(): boolean {
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    // Check if the OS is iOS
    const osName = result.os.name?.toLowerCase();
    setIsIOS(osName === "ios");
  }, []);

  return isIOS;
}

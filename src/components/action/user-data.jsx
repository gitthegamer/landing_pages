import { useState, useEffect, useCallback, useRef } from "react";
import { loadToken, loadUser } from "./preferences";
import CommonState from "../../atoms/CommonState";
import AuthState from "../../atoms/AuthState";
import { useRecoilState } from "recoil";

export function useTokenAndUser() {
  const [token, setToken] = useState(null);
  const [authState, setAuthState] = useRecoilState(AuthState);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(authState.user);
  }, [authState.user]);

  const [amounts, setAmounts] = useState({
    main_balance: "0.00",
    reward_balance: "0.00",
    lockable_balance: "0.00",
    totalAmount: "0.00",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [tokenRemoved, setTokenRemoved] = useState(false);

  const [commonState, setCommonState] = useRecoilState(CommonState);

  const checkTokenChange = useCallback(async () => {
    const currentToken = await loadToken();
    if (token && !currentToken) {
      setTokenRemoved(true);
    } else {
      setTokenRemoved(false);
    }
    setToken(currentToken);
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await checkTokenChange();
      const fetchedUser = await loadUser();
      setAuthState((prev) => ({ ...prev, user: fetchedUser }));
      const main_balance = fetchedUser?.main_balance ?? 0;
      const reward_balance = fetchedUser?.fd_balance ?? 0;
      const lockable_balance = fetchedUser?.lockable_balance ?? 0;
      const totalAmount = (
        parseFloat(main_balance) +
        parseFloat(reward_balance) +
        parseFloat(lockable_balance)
      ).toFixed(2);

      setAmounts({
        main_balance: parseFloat(main_balance).toFixed(2),
        reward_balance: parseFloat(reward_balance).toFixed(2),
        lockable_balance: parseFloat(lockable_balance).toFixed(2),
        totalAmount,
      });
      setTimeout(() => {
        setIsLoading(false);
      }, [1000]);
    };

    fetchData();
    const intervalId = setInterval(checkTokenChange, 1000);
    return () => clearInterval(intervalId);
  }, [checkTokenChange]);

  return { token, user, amounts, isLoading, checkTokenChange };
}

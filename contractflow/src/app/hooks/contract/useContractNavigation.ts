"use client";

export function useContractNavigation() {
  function goToSuccess() {
    window.location.href = "/success";
  }

  return { goToSuccess };
}


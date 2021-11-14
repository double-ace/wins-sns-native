const useRefreshToken = async () => {
  const refresh = await getData('refresh');
  const headers = await createHeader();
  if (refresh && headers) {
    await axios.post(
      baseUrl + '/api/v1/auth/jwt/refresh/',
      { refresh },
      headers
    );
  }
};
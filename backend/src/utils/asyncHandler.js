/**
 * Wrapper para controllers async, eliminando a necessidade de try/catch repetitivo
 * Captura erros automaticamente e passa para o middleware de erro
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

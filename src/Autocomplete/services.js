import httpService from '../httpService';

const apiEndpoint = '/characters';
const apiKey = process.env.REACT_APP_API_KEY;

/**
 *
 * @param {string} value - search value term
 */

export const getCharactersService = value =>
    httpService.get(
        `${apiEndpoint}?ts=1&nameStartsWith=${value}&apikey=${apiKey}`
    );

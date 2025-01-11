/**
 * AppDTOManager Singleton Class
 * 
 * This class serves as a centralized manager for handling Data Transfer Objects (DTOs)
 * across multiple pages in a React application. The primary use case is to provide
 * an easy and consistent way to share data between pages by maintaining a 
 * JSON-like structure (`pageDtoJson`) for each page.
 * 
 * Design Principles:
 * 1. **Singleton Design Pattern**: Ensures only one instance of `AppDTOManager` exists
 *    throughout the application's lifecycle, providing a global point of access.
 * 2. **Encapsulation**: The `pageDtoJson` is encapsulated within the class, ensuring
 *    controlled access through getter (`getPageDto`) and setter (`setPageDto`) methods.
 * 3. **Loose Coupling**: Pages interact with `AppDTOManager` via its public API,
 *    minimizing direct dependencies and improving testability.
 * 4. **Extendability**: The design allows future extensions, such as adding logging,
 *    validation, or additional metadata to the `pageDtoJson` objects.
 * 5. **Performance Optimization**: A single instance minimizes memory overhead 
 *    compared to creating multiple instances for every page interaction.
 */
class AppDTOManager {
    // Static instance of the singleton class
    private static instance: AppDTOManager;
  
    // Private storage for page-specific DTOs
    private pageDtoJson: Record<string, any>;
  
    /**
     * Private Constructor
     * - Restricts instantiation of the class from outside to enforce the Singleton pattern.
     */
    private constructor() {
      /**
       * Initializes the `pageDtoJson` as an empty object.
       * Keys will represent page names, and values will hold DTOs for each page.
       * Example Structure:
       * {
       *   "home": { title: "Home Page", data: [...] },
       *   "login": { userDetails: {}, error: null },
       * }
       */
      this.pageDtoJson = {};
    }
  
    /**
     * Public Static Method: getInstance
     * - Provides a global access point to the singleton instance.
     * - Ensures that only one instance of `AppDTOManager` exists.
     * 
     * @returns {AppDTOManager} The singleton instance of the class.
     */
    public static getInstance(): AppDTOManager {
      if (!AppDTOManager.instance) {
        // Instantiate the singleton instance if it doesn't already exist
        AppDTOManager.instance = new AppDTOManager();
      }
      return AppDTOManager.instance;
    }
  
    /**
     * Public Method: getPageDto
     * - Retrieves the DTO for a specified page.
     * - Returns `null` if the page does not exist in `pageDtoJson`.
     * 
     * @param {string} pageName - The name of the page whose DTO is to be retrieved.
     * @returns {any | null} The DTO object for the specified page, or null if not found.
     */
    public getPageDto(pageName: string): any | null {
      /**
       * Check if the page exists in the DTO map.
       * If it doesn't exist, return null; otherwise, return the corresponding DTO.
       */
      return this.pageDtoJson[pageName] || null;
    }
  
    /**
     * Public Method: setPageDto
     * - Sets or updates the DTO for a specified page.
     * - If the page already exists, its DTO is updated; otherwise, a new entry is created.
     * 
     * @param {string} pageName - The name of the page to set or update the DTO for.
     * @param {any} json - The DTO object to associate with the page.
     */
    public setPageDto(pageName: string, json: any): void {
      /**
       * Validate the input (optional, can be extended for robust validation).
       * Example: Ensure `json` is a non-null object.
       */
      if (typeof json !== "object" || json === null) {
        throw new Error("Invalid DTO: DTO must be a non-null object.");
      }
  
      // Assign the DTO to the corresponding page name in the `pageDtoJson`
      this.pageDtoJson[pageName] = json;
    }
  }
  
  export default AppDTOManager;
  
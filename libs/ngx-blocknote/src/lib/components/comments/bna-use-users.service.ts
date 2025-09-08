import { Injectable, signal, computed, DestroyRef, inject } from '@angular/core';
import { BlockNoteEditor } from '@blocknote/core';
import { User } from '@blocknote/core/comments';

/**
 * Angular equivalent of React's useUsers and useUser hooks
 * Bridges the UserStore to Angular using signals for reactive updates
 */
@Injectable({
  providedIn: 'root'
})
export class BnaUseUsersService {
  private destroyRef = inject(DestroyRef);

  /**
   * Creates a signal that tracks a single user from the editor's user store
   * Angular equivalent of React's useUser hook
   * @param editor - BlockNote editor instance with comments plugin
   * @param userId - ID of the user to track
   * @returns Signal containing the user data or undefined
   */
  createUserSignal(editor: BlockNoteEditor<any, any, any>, userId: string) {
    const usersSignal = this.createUsersSignal(editor, [userId]);
    return computed(() => usersSignal().get(userId));
  }

  /**
   * Creates a signal that tracks multiple users from the editor's user store
   * Angular equivalent of React's useUsers hook
   * @param editor - BlockNote editor instance with comments plugin
   * @param userIds - Array of user IDs to track
   * @returns Signal containing a map of user data
   */
  createUsersSignal(editor: BlockNoteEditor<any, any, any>, userIds: string[]) {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    const store = comments.userStore;
    const usersSignal = signal<Map<string, User>>(new Map());

    // Function to get updated snapshot
    const getUpdatedSnapshot = () => {
      const map = new Map<string, User>();
      for (const id of userIds) {
        const user = store.getUser(id);
        if (user) {
          map.set(id, user);
        }
      }
      return map;
    };

    // Initialize with current users
    usersSignal.set(getUpdatedSnapshot());

    // Set up subscription for updates
    // Note: this is inefficient as it will trigger a re-render even if other users (not in userIds) are updated
    const unsubscribe = store.subscribe((_users) => {
      // Update signal when users change
      usersSignal.set(getUpdatedSnapshot());
    });

    // Load users on demand
    store.loadUsers(userIds);

    // Clean up subscription when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      unsubscribe();
    });

    return usersSignal.asReadonly();
  }

  /**
   * Gets a single user synchronously from the editor's user store
   * @param editor - BlockNote editor instance with comments plugin
   * @param userId - ID of the user to get
   * @returns User data or undefined
   */
  getUser(editor: BlockNoteEditor<any, any, any>, userId: string): User | undefined {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    return comments.userStore.getUser(userId);
  }

  /**
   * Gets multiple users synchronously from the editor's user store
   * @param editor - BlockNote editor instance with comments plugin
   * @param userIds - Array of user IDs to get
   * @returns Map of user data
   */
  getUsers(editor: BlockNoteEditor<any, any, any>, userIds: string[]): Map<string, User> {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    const store = comments.userStore;
    const map = new Map<string, User>();

    for (const id of userIds) {
      const user = store.getUser(id);
      if (user) {
        map.set(id, user);
      }
    }

    return map;
  }

  /**
   * Sets up a callback for user updates
   * @param editor - BlockNote editor instance
   * @param userIds - Array of user IDs to track
   * @param callback - Function to call when users are updated
   * @returns Cleanup function
   */
  setupUsersListener(
    editor: BlockNoteEditor<any, any, any>,
    userIds: string[],
    callback: (users: Map<string, User>) => void
  ): () => void {
    const comments = editor.comments;
    if (!comments) {
      throw new Error('Comments plugin not found');
    }

    const store = comments.userStore;

    // Function to get updated snapshot
    const getUpdatedSnapshot = () => {
      const map = new Map<string, User>();
      for (const id of userIds) {
        const user = store.getUser(id);
        if (user) {
          map.set(id, user);
        }
      }
      return map;
    };

    // Call immediately with current state
    callback(getUpdatedSnapshot());

    // Set up subscription for updates
    const unsubscribe = store.subscribe((_users) => {
      callback(getUpdatedSnapshot());
    });

    // Load users on demand
    store.loadUsers(userIds);

    // Clean up subscription when component/service is destroyed
    this.destroyRef.onDestroy(() => {
      unsubscribe();
    });

    return unsubscribe;
  }
}

/**
 * Standalone function version for single user
 * Angular equivalent of React's useUser hook
 */
export function useUser(
  editor: BlockNoteEditor<any, any, any>,
  userId: string
): {
  user: () => User | undefined;
  cleanup: () => void;
} {
  const usersResult = useUsers(editor, [userId]);
  const userSignal = computed(() => usersResult.users().get(userId));

  return {
    user: userSignal,
    cleanup: usersResult.cleanup
  };
}

/**
 * Standalone function version for multiple users
 * Angular equivalent of React's useUsers hook
 */
export function useUsers(
  editor: BlockNoteEditor<any, any, any>,
  userIds: string[]
): {
  users: () => Map<string, User>;
  cleanup: () => void;
} {
  const comments = editor.comments;
  if (!comments) {
    throw new Error('Comments plugin not found');
  }

  const store = comments.userStore;
  const usersSignal = signal<Map<string, User>>(new Map());

  // Function to get updated snapshot
  const getUpdatedSnapshot = () => {
    const map = new Map<string, User>();
    for (const id of userIds) {
      const user = store.getUser(id);
      if (user) {
        map.set(id, user);
      }
    }
    return map;
  };

  // Initialize with current users
  usersSignal.set(getUpdatedSnapshot());

  // Set up subscription for updates
  const unsubscribe = store.subscribe((_users) => {
    usersSignal.set(getUpdatedSnapshot());
  });

  // Load users on demand
  store.loadUsers(userIds);

  return {
    users: usersSignal.asReadonly(),
    cleanup: unsubscribe
  };
}

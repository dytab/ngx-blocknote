# Comments System - Future Enhancement

## Overview
The collaborative commenting system from the React BlockNote implementation has been identified but not fully implemented in this Angular wrapper. This document outlines what would be needed for a complete implementation.

## Current Status
- ✅ Basic comment button components exist (add-comment-button, add-tiptap-comment-button)
- ✅ Basic Comments component structure created
- ❌ Full collaborative commenting system not implemented

## React Components That Would Need Angular Equivalents

### Core Components
1. **Comment.tsx** (324 lines) - Individual comment with editing, reactions, deletion
2. **CommentEditor.tsx** - Rich text editor for creating/editing comments
3. **Comments.tsx** - Container for thread comments with resolve functionality
4. **FloatingThreadController.tsx** - Positioning and lifecycle management
5. **EmojiPicker.tsx** - Emoji selection for reactions
6. **ReactionBadge.tsx** - Display comment reactions
7. **useUsers.js** - User data management hook

### Required Dependencies
- `@blocknote/core/comments` - ThreadData, CommentData types
- Complex state management for comment editing, reactions, user management
- Thread store integration for persistence
- Authentication and permissions handling

## Implementation Complexity
- **High complexity** - Would require ~1000+ lines of Angular code
- **External dependencies** - Requires comments plugin to be enabled
- **Real-time features** - Would need WebSocket or polling for collaboration
- **User management** - Requires user authentication and avatar handling

## Recommended Approach
1. Implement basic commenting infrastructure first
2. Add comment CRUD operations
3. Implement reactions system
4. Add real-time collaboration features
5. Polish UI/UX and accessibility

## Notes
The current Angular wrapper focuses on core editor functionality. Collaborative commenting represents a significant feature enhancement that would be better implemented as a dedicated module once the core wrapper is stable.
